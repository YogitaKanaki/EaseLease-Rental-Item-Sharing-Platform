import React, { useEffect, useState } from "react";
import axios from "axios";

const RentalsManagement = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/rentals");
      setRentals(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const closeModal = () => {
    setSelectedRental(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Rentals Management</h2>

      {rentals.length === 0 ? (
        <p className="text-gray-600">No rentals available.</p>
      ) : (
        rentals.map((rental) => (
          <div
            key={rental.id}
            className="bg-white shadow-lg rounded-2xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-xl"
          >
            <div className="flex-1">
              <p><strong>Item:</strong> {rental.productName || "Unknown Item"}</p>
              <p><strong>Owner:</strong> {rental.owner || "N/A"}</p>
              <p><strong>Renter:</strong> {rental.renterName || "N/A"}</p>
              <p>
                <strong>Start:</strong> {rental.startDate} | <strong>End:</strong> {rental.endDate}
              </p>
              <p><strong>Amount Paid:</strong> ₹{rental.totalCost || 0}</p>
              <p><strong>Payment:</strong> {rental.paymentType || "N/A"}</p>
            </div>

            {/* Buttons stacked vertically */}
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <button
                className="bg-primary hover:bg-primary-dull text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
                onClick={() => setSelectedRental(rental)}
              >
                View Details
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                Refund
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Cancel
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal for rental details */}
      {selectedRental && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Rental Details
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Item:</strong> {selectedRental.productName}</p>
              <p><strong>Owner:</strong> {selectedRental.owner}</p>
              <p><strong>Owner Email:</strong> {selectedRental.ownerEmail}</p>
              <p><strong>Renter:</strong> {selectedRental.renterName}</p>
              <p><strong>Renter Email:</strong> {selectedRental.renterEmail}</p>
              <p>
                <strong>Rental Period:</strong> {selectedRental.startDate} →{" "}
                {selectedRental.endDate}
              </p>
              <p><strong>Total Cost:</strong> ₹{selectedRental.totalCost}</p>
              <p><strong>Payment Type:</strong> {selectedRental.paymentType}</p>              
            </div>

            <div className="mt-5 text-right">
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalsManagement;
