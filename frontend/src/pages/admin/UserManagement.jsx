import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch all users with item/rental counts
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ View Profile (fetch full user details)
  const handleViewProfile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

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
                {user.status || "Active"}
              </span>
            </div>

            <p className="text-sm text-gray-500">📧 {user.email}</p>
            <p className="text-sm text-gray-500">
              📦 Items Listed: {user.itemsListed ?? 0}
            </p>
            <p className="text-sm text-gray-500">
              🔁 Rentals Made: {user.rentalsMade ?? 0}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleViewProfile(user.id)}
                className="px-3 py-1 bg-primary cursor-pointer text-white rounded-lg hover:bg-primary-dull text-sm"
              >
                View Profile
              </button>
              
              
            </div>
          </div>
        ))}
      </div>

      {/* ✅ User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 shadow-xl relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedUser.name}'s Profile
            </h2>

            <p className="text-sm text-gray-600 mb-2">📧 {selectedUser.email}</p>
            <p className="text-sm text-gray-600 mb-2">
              🗓️ Joined: {selectedUser.joinedDate?.split("T")[0] || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Total Rentals: {selectedUser.rentals?.length ?? 0}
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Items Listed:
              </h3>
              {selectedUser.items?.length ? (
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  {selectedUser.items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No items listed.</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Rentals Made:
              </h3>
              {selectedUser.rentals?.length ? (
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  {selectedUser.rentals.map((rental) => (
                    <li key={rental.id}>
                      Product ID: {rental.productId} — Total Cost: ₹
                      {rental.totalCost}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No rentals found.</p>
              )}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
