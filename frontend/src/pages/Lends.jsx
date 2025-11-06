import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lends = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const currency = "₹";

  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState({}); // mapping productId => bookings

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      try {
        // 1️⃣ Fetch products owned by the user
        const prodRes = await fetch(`http://localhost:8080/api/product/owner/${user.email}`);
        const prodData = await prodRes.json();

        // Ensure images have correct Base64 format
        const fixedProducts = prodData.map((prod) => ({
          ...prod,
          images: prod.images?.map((img) =>
            img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
          ),
        }));
        setProducts(fixedProducts);

        // 2️⃣ Fetch bookings for each product
        const bookingsMap = {};
        for (const prod of fixedProducts) {
          const res = await fetch(`http://localhost:8080/api/rentals/product/${prod._id}`);
          const rentalData = await res.json();

          bookingsMap[prod._id] = rentalData.map((rental) => ({
            user: {
              name: rental.renterName || "Unknown",
              email: rental.renterEmail?.includes("@") ? rental.renterEmail : "",
              contact: !rental.renterEmail?.includes("@") ? rental.renterEmail : "",
            },
            startDate: rental.startDate,
            endDate: rental.endDate,
            isPaid: rental.paymentType === "Online" ? true : false,
          }));
        }

        setBookings(bookingsMap);
      } catch (err) {
        console.error("❌ Failed to fetch products or bookings:", err);
      }
    };

    fetchProducts();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login to view your products.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Products & Bookings</h2>

      <div className="space-y-6">
        {products.length === 0 && <p className="text-gray-500 italic">No products listed yet.</p>}

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 border border-gray-100"
          >
            {/* Product Info */}
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 w-full lg:w-1/2">
              <img
                src={product.images?.[0] || "/default-product.png"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md shadow"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium text-indigo-600">Deposit:</span> {currency}
                  {product.deposit}
                </p>
              </div>
            </div>

            {/* Booking Info */}
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold text-gray-700 mb-2">Bookings</h4>
              {bookings[product._id]?.length > 0 ? (
                bookings[product._id].map((booking, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg px-4 py-3 mb-3 border border-gray-200 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-gray-700 mb-1">
                        👤 <span className="font-medium">Renter Name:</span> {booking.user.name}
                      </p>
                      {booking.user.contact && (
                        <p className="text-sm text-gray-700 mb-1">
                          📞 <span className="font-medium">Contact:</span>{" "}
                          <a
                            href={`tel:${booking.user.contact}`}
                            className="text-blue-600 hover:underline"
                          >
                            {booking.user.contact}
                          </a>
                        </p>
                      )}
                      {booking.user.email && (
                        <p className="text-sm text-gray-700 mb-1">
                          📧 <span className="font-medium">Email:</span>{" "}
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${booking.user.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {booking.user.email}
                          </a>
                        </p>
                      )}
                      <p className="text-sm text-gray-700 mb-1">
                        📅 <span className="font-medium">Dates:</span> {booking.startDate} to{" "}
                        {booking.endDate}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          booking.isPaid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        💰 Payment: {booking.isPaid ? "Paid" : "Unpaid"}
                      </p>
                    </div>

                    <div className="ml-4">
                      <button
                        onClick={() =>
                          navigate("/report", { state: { product, booking } })
                        }
                        className="relative group"
                      >
                        <Lightbulb className="w-6 h-6 text-yellow-500 hover:text-yellow-600 transition" />
                        <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Report
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="italic text-gray-400">No bookings — Available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lends;
