import React from "react";

const users = [
  {
    id: "U001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    role: "Owner",
    status: "Active",
    itemsListed: 5,
    rentalsMade: 3,
    dateJoined: "2025-05-01",
  },
  {
    id: "U002",
    name: "Sarah Khan",
    email: "sarah@example.com",
    phone: "+91 9123456780",
    role: "Both",
    status: "Suspended",
    itemsListed: 8,
    rentalsMade: 10,
    dateJoined: "2025-06-12",
  },
  {
    id: "U003",
    name: "Ravi Patel",
    email: "ravi@example.com",
    phone: "+91 9988776655",
    role: "Renter",
    status: "Pending Verification",
    itemsListed: 0,
    rentalsMade: 2,
    dateJoined: "2025-07-20",
  },
];

export default function UserManagement() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : user.status === "Suspended"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">ID: {user.id}</p>
            <p className="text-sm text-gray-500">📧 {user.email}</p>
            <p className="text-sm text-gray-500">📱 {user.phone}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
            <p className="text-sm text-gray-500">
              Items Listed: {user.itemsListed}
            </p>
            <p className="text-sm text-gray-500">
              Rentals Made: {user.rentalsMade}
            </p>
            <p className="text-sm text-gray-500">
              Date Joined: {user.dateJoined}
            </p>

            <div className="flex justify-between mt-4">
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                View Profile
              </button>
              <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm">
                Suspend
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
