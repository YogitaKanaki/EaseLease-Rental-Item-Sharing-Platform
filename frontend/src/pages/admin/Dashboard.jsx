import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: 1245, color: "bg-blue-500" },
    { title: "Total Items Listed", value: 320, color: "bg-green-500" },
    { title: "Total Rentals Completed", value: 980, color: "bg-purple-500" },
    { title: "Active Rentals", value: 45, color: "bg-yellow-500" },
    { title: "Pending Approvals", value: 12, color: "bg-orange-500" },
    { title: "Reports / Complaints", value: 8, color: "bg-red-500" },
    { title: "Revenue Generated", value: "₹1,25,000", color: "bg-teal-500" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg p-6 text-white flex flex-col items-center justify-center cursor-default ${stat.color}`}
          >
            <h2 className="text-lg font-semibold mb-2">{stat.title}</h2>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
