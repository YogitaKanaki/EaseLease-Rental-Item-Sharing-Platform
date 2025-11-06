import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast";
import axios from "axios";

const ProductDetails = () => {
    const { currency, user } = useAppContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [bookedDates, setBookedDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/product/${id}`);
                const prod = res.data;

                // Fix images
                const fixedImages = prod.images?.map(img =>
                    img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
                ) || [];

                setProduct({ ...prod, images: fixedImages });
                setThumbnail(fixedImages.length > 0 ? fixedImages[0] : null);

                // Fetch related products
                const relatedRes = await axios.get(
                    `http://localhost:8080/api/product/related/${prod.category}`
                );
                const fixedRelated = relatedRes.data.map(p => ({
                    ...p,
                    images: p.images?.map(img =>
                        img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
                    ) || [],
                }));
                setRelatedProducts(fixedRelated.filter(p => p._id !== prod._id).slice(0, 5));

                // Fetch booked dates
                const rentalsRes = await axios.get(`http://localhost:8080/api/rentals/product/${prod._id}`);
                const booked = rentalsRes.data.flatMap(r => {
                    const start = new Date(r.startDate);
                    const end = new Date(r.endDate);
                    const arr = [];
                    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                        arr.push(d.toISOString().split("T")[0]); // store as YYYY-MM-DD
                    }
                    return arr;
                });
                setBookedDates(booked);

            } catch (err) {
                console.error(err);
                toast.error("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleRentNow = async () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates");
            return;
        }
        if (bookedDates.some(d => d >= startDate && d <= endDate)) {
            toast.error("Selected dates are already booked");
            return;
        }
        if (product.ownerEmail === user?.email) {
            toast.error("Cannot rent own product");
            return;
        }

        try {
            const payload = {
                productId: product._id,
                startDate,
                endDate,
                renterName: user?.name || "Guest",
                renterEmail: user?.email || "guest@example.com",
                paymentType: "Online",
            };
            const res = await axios.post("http://localhost:8080/api/rentals/create", payload);
            toast.success("Product Booked Successfully");
            navigate("/rentals");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Failed to book product");
        }
    };

    // Disable booked and past dates for input type="date"
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    const isDateDisabled = (date) => {
        return bookedDates.includes(date);
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!product) return <p className="text-center mt-20">Product not found</p>;

    return (
        <div className="mt-12 px-4">
            <p className="text-sm mb-4">
                <Link to="/" className="text-primary hover:underline">Home</Link> /{" "}
                <Link to="/products" className="text-primary hover:underline">Products</Link> /{" "}
                <span className="text-primary font-medium">{product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                {/* Images */}
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images?.length > 0 && product.images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setThumbnail(img)}
                                className={`border rounded overflow-hidden cursor-pointer transition-all duration-300 ${thumbnail === img ? "border-primary" : "border-gray-300"}`}
                            >
                                <img src={img} alt={`Thumbnail ${idx}`} className="w-24 h-24 object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="border border-gray-300 rounded overflow-hidden flex-1 flex items-center justify-center">
                        <img src={thumbnail} alt="Selected" className="w-full h-96 object-contain" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>
                    <p className="text-2xl font-medium mt-6">{currency}{product.pricePerDay}/day</p>
                    <p className="text-gray-500/70">Deposit: {currency}{product.deposit}</p>

                    <div className="mt-4">
                        <p className="font-medium">Owner:</p>
                        <p className="text-gray-500/80">{product.owner || "Not specified"}</p>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {Array.isArray(product.description) ? product.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                        )) : <li>{product.description}</li>}
                    </ul>

                    <div className="mt-6">
                        <p className="font-medium mb-2">Select Rental Dates</p>
                        <div className="flex gap-4">
                            <input
                                type="date"
                                className="border p-2 rounded text-primary"
                                min={getMinDate()}
                                max={product.availableTo}
                                value={startDate}
                                onChange={e => {
                                    if (!isDateDisabled(e.target.value)) setStartDate(e.target.value);
                                    else toast.error("This product is already booked");
                                }}
                            />
                            <input
                                type="date"
                                className="border p-2 rounded text-primary"
                                min={startDate || getMinDate()}
                                max={product.availableTo}
                                value={endDate}
                                onChange={e => {
                                    if (!isDateDisabled(e.target.value)) setEndDate(e.target.value);
                                    else toast.error("This product is already booked");
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleRentNow}
                        disabled={product.ownerEmail === user?.email}
                        className="w-full mt-6 py-3.5 bg-primary text-white rounded hover:bg-primary-dull transition disabled:opacity-50"
                    >
                        {product.ownerEmail === user?.email ? "Cannot rent own product" : "Rent Now"}
                    </button>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-20">
                <h2 className="text-3xl font-medium mb-4">Related Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {relatedProducts.map((prod, idx) => (
                        <ProductCard key={idx} product={prod} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
