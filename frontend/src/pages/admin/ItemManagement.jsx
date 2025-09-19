import React from "react";

const ItemManagement = () => {
  const items = [
    {
      id: "ITM001",
      image: "https://via.placeholder.com/60",
      title: "Canon DSLR Camera",
      category: "Electronics",
      owner: "John Doe",
      price: "₹500/day",
      availability: "2025-08-12 to 2025-08-20",
      status: "Active",
      timesRented: 3,
      reports: 0
    },
    {
      id: "ITM002",
      image: "https://via.placeholder.com/60",
      title: "Mountain Bike",
      category: "Sports",
      owner: "Sarah Lee",
      price: "₹300/day",
      availability: "2025-08-15 to 2025-08-25",
      status: "Pending Approval",
      timesRented: 0,
      reports: 1
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Item Management</h2>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-500">Owner: {item.owner}</p>
                <p className="text-sm text-gray-500">Price: {item.price}</p>
                <p className="text-sm text-gray-500">Availability: {item.availability}</p>
                <p className={`text-sm font-semibold ${item.status === "Active" ? "text-green-600" : item.status === "Pending Approval" ? "text-yellow-600" : "text-red-600"}`}>
                  Status: {item.status}
                </p>
                <p className="text-sm text-gray-500">Times Rented: {item.timesRented}</p>
                <p className="text-sm text-gray-500">Reports: {item.reports}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
              <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
              <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManagement;
