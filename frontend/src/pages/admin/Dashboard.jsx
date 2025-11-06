import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const statBoxes = [
    { title: "Total Users", value: stats.totalUsers, color: "bg-blue-500" },
    { title: "Total Items Listed", value: stats.totalProducts, color: "bg-green-500" },
    { title: "Total Rentals Completed", value: stats.totalRentals, color: "bg-purple-500" },
    { title: "Active Rentals", value: stats.activeRentals, color: "bg-yellow-500" },
    { title: "Reports / Complaints", value: stats.reports, color: "bg-red-500" },
    { title: "Revenue Generated", value: `₹${stats.revenue}`, color: "bg-teal-500" },
  ];

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statBoxes.map((stat, i) => (
          <div
            key={i}
            className={`rounded-xl shadow-lg p-6 text-white flex flex-col items-center justify-center ${stat.color}`}
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
