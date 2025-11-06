import React, { useEffect, useState } from "react";

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/items");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Fetched items:", data);
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // ✅ Render correct image source (handles base64 or URL)
  const getImage = (image) => {
    if (!image) return "https://via.placeholder.com/60";
    return image.startsWith("data:image") ? image : `data:image/png;base64,${image}`;
  };

  if (loading) return <p className="p-6 text-gray-600">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Item Management</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
            >
              {/* Item Details */}
              <div className="flex items-center gap-4">
                <img
                  src={getImage(item.image)}
                  alt={item.title}
                  className="w-20 h-20 rounded-md object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm text-gray-600">👤 Owner: {item.owner}</p>
                  <p className="text-sm text-gray-600">💰 Price: {item.price}</p>
                  <p className="text-sm text-gray-600">🔁 Times Rented: {item.timesRented}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dull cursor-pointer rounded hover:bg-blue-700"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal for Viewing Profile */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <div className="flex flex-col items-center">
              <img
                src={getImage(selectedItem.image)}
                alt={selectedItem.title}
                className="w-28 h-28 rounded-lg object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{selectedItem.title}</h2>
              <p className="text-gray-500 text-sm mb-3">{selectedItem.category}</p>
              <div className="w-full text-left text-gray-700 text-sm space-y-1">
                <p><strong>Owner:</strong> {selectedItem.owner || "N/A"}</p>
                <p><strong>Email:</strong> {selectedItem.ownerEmail || "N/A"}</p>
                <p><strong>Price:</strong> {selectedItem.price}</p>
                <p><strong>Times Rented:</strong> {selectedItem.timesRented}</p>
                <p><strong>Status:</strong> {selectedItem.status}</p>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-300 cursor-pointer rounded-lg hover:bg-gray-400 text-sm font-medium"
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

export default ItemManagement;
