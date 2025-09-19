import React from "react";
import { DummyProducts, dummyRentals } from "../assets/assets";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lends = () => {
  const currency = "₹";
  const navigate = useNavigate();

  // Create a mapping of productId => bookings
  const productBookings = {};
  dummyRentals.forEach((rental) => {
    rental.items.forEach((item) => {
      const productId = item.product._id;
      if (!productBookings[productId]) productBookings[productId] = [];
      productBookings[productId].push({
        user: {
          name: rental.name || "Unknown",
          email: rental.contact?.includes("@") ? rental.contact : "",
          contact:
            rental.contact && !rental.contact.includes("@")
              ? rental.contact
              : "",
        },
        startDate: rental.startDate,
        endDate: rental.endDate,
        isPaid: rental.isPaid,
      });
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Rental History</h2>

      <div className="space-y-6">
        {DummyProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 border border-gray-100"
          >
            {/* Product Info */}
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 w-full lg:w-1/2">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md shadow"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium text-indigo-600">Deposit:</span>{" "}
                  {currency}
                  {product.deposit}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Status:</span>{" "}
                  {product.inStock ? (
                    <span className="text-green-600 font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Booking Info */}
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold text-gray-700 mb-2">Bookings</h4>
              {productBookings[product._id]?.length > 0 ? (
                productBookings[product._id].map((booking, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg px-4 py-3 mb-3 border border-gray-200 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-gray-700 mb-1">
                        👤 <span className="font-medium">Renter Name:</span>{" "}
                        {booking.user?.name}
                      </p>
                      {booking.user?.contact && (
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
                      {booking.user?.email && (
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
                        📅 <span className="font-medium">Dates:</span>{" "}
                        {booking.startDate} to {booking.endDate}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          booking.isPaid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        💰 Payment: {booking.isPaid ? "Paid" : "Unpaid"}
                      </p>
                    </div>

                    {/* Report Bulb */}
                    <div className="ml-4">
                      <button
                        onClick={() =>
                          navigate("/report", {
                            state: {
                              product,
                              booking,
                            },
                          })
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
