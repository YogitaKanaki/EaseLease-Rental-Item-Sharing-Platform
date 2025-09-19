import React from "react";

const RentalsManagement = () => {
  const rentals = [
    {
      id: "RNT001",
      item: "Canon DSLR Camera",
      owner: "John Doe",
      renter: "Alice Smith",
      startDate: "2025-08-12",
      endDate: "2025-08-15",
      amount: "₹1500",
      paymentStatus: "Paid",
      rentalStatus: "Ongoing",
      returnStatus: "On Time"
    },
    {
      id: "RNT002",
      item: "Mountain Bike",
      owner: "Sarah Lee",
      renter: "Mark Wilson",
      startDate: "2025-08-10",
      endDate: "2025-08-14",
      amount: "₹1200",
      paymentStatus: "Pending",
      rentalStatus: "Completed",
      returnStatus: "Late"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Rentals Management</h2>
      <div className="grid grid-cols-1 gap-4">
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-white rounded-lg shadow p-4 flex justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-lg font-semibold">{rental.item}</h3>
              <p className="text-sm text-gray-500">Owner: {rental.owner}</p>
              <p className="text-sm text-gray-500">Renter: {rental.renter}</p>
              <p className="text-sm text-gray-500">Start: {rental.startDate} | End: {rental.endDate}</p>
              <p className="text-sm text-gray-500">Amount Paid: {rental.amount}</p>
              <p className={`text-sm font-semibold ${rental.paymentStatus === "Paid" ? "text-green-600" : rental.paymentStatus === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
                Payment: {rental.paymentStatus}
              </p>
              <p className="text-sm text-blue-600">Rental Status: {rental.rentalStatus}</p>
              <p className="text-sm text-purple-600">Return: {rental.returnStatus}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</button>
              <button className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Refund</button>
              <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalsManagement;
