import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import {toast} from "react-hot-toast";

const ProductDetails = () => {

    const {products,navigate,currency}=useAppContext()
    const {id}=useParams()

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const product=products.find((item)=>item._id===id);

    useEffect(()=>{
        if(products.length>0 && product){
            let productsCopy = products.slice();
            productsCopy=productsCopy.filter((item)=>product.category===item.category)
            setRelatedProducts(productsCopy.slice(0,5))
        }

    },[products, product])

    useEffect(()=>{
        setThumbnail(product?.image[0]?product.image[0]:null)
    },[product])

    const handleRentNow = () => {
        if(!startDate || !endDate){
            //alert("Please select both start and end dates");
            toast.error("Please select both start and end dates")
            
            return;
        }
        navigate('/rentnow', { state: { productId: product._id, startDate, endDate } });
    }

    return product && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}>Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-contain" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img src={i<4?assets.star_icon:assets.star_dull_icon} alt="" 
                            className="md:w-4 w-3.5" />
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-2xl font-medium">MRP: {currency}{product.pricePerDay}/day</p>
                        <p className="text-gray-500/70 ">Deposit: {currency}{product.deposit}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    {/* Date selection */}
                    <div className="mt-6">
                        <p className="font-medium mb-2">Select Rental Dates</p>
                        <div className="flex gap-4">
                            <input
                                type="date"
                                className="border p-2 rounded text-primary"
                                min={product.availableFrom}
                                max={product.availableTo}
                                value={startDate}
                                onChange={(e)=>setStartDate(e.target.value)}
                            />
                            <input
                                type="date"
                                className="border p-2 rounded text-primary"
                                min={startDate || product.availableFrom}
                                max={product.availableTo}
                                value={endDate}
                                onChange={(e)=>setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={handleRentNow} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Rent Now
                        </button>
                    </div>
                </div>
            </div>

            {/*----related products----*/}
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                    {relatedProducts.filter((product)=>product.inStock).map((product,index)=>(
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
                <button onClick={()=>{navigate('/products');scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded
                text-primary hover:bg-primary/10 transition">See More</button>
            </div>
        </div>
    );
};
export default ProductDetails;
