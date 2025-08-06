import React from "react";
import { DummyProducts, dummyRentals } from "../assets/assets";
//import { DummyProducts, dummyRentals } from "../assets"; // Adjust path based on your folder structure

const Lends = () => {
  const currency = "₹"; // You can change it to "$" if needed

  // Create a mapping of productId => bookings
  const productBookings = {};
  dummyRentals.forEach((rental) => {
    rental.items.forEach((item) => {
      const productId = item.product._id;
      if (!productBookings[productId]) productBookings[productId] = [];
      productBookings[productId].push({
        user: rental.userId || "User", // If you want names, expand dummyRentals with full user info
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
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium text-indigo-600">Deposit:</span>{" "}
                  {currency}
                  {product.deposit}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Status:</span>{" "}
                  {product.inStock ? (
                    <span className="text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
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
                    className="bg-gray-50 rounded-lg px-4 py-3 mb-3 border border-gray-200"
                  >
                    <p className="text-sm text-gray-700 mb-1">
                      👤 <span className="font-medium">User:</span>{" "}
                      {typeof booking.user === "object"
                        ? booking.user.name
                        : booking.user}
                    </p>
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
