import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Rentals = () => {
  const { user, currency } = useAppContext();
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchRentals = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/rentals/user/${user.email}`);
        const data = await res.json();

        // Enrich rentals with product details and calculate total
        const enriched = await Promise.all(
          data.map(async (rental) => {
            const productRes = await fetch(`http://localhost:8080/api/product/${rental.productId}`);
            const product = await productRes.json();

            // Fix Base64 image if needed
            const fixedImages = product.images?.map(img =>
              img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
            );

            // Calculate total cost: totalDays * pricePerDay + deposit
            const totalCost = (rental.totalDays || 1) * product.pricePerDay + (product.deposit || 0);

            return { 
              ...rental, 
              totalCost,
              product: { 
                ...product, 
                images: fixedImages,
                owner: product.owner || product.ownerName || "Not specified" // ✅ Fetch owner name
              } 
            };
          })
        );

        setRentals(enriched);
      } catch (err) {
        console.error("❌ Failed to fetch rentals:", err);
      }
    };

    fetchRentals();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login to view your rentals.</p>;

  return (
    <div className="mt-16 pb-16 px-4">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Rentals</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {rentals.length === 0 && (
        <p className="text-gray-500 italic text-center mt-8">No rentals yet.</p>
      )}

      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl mx-auto"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>Rental ID: {rental.id}</span>
            <span>Payment: {rental.paymentType || "—"}</span>
            <span>Total: {currency}{rental.totalCost}</span>
          </p>

          {rental.product && (
            <div className="relative bg-white text-gray-600 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-6 border-t mt-4">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={rental.product.images?.[0] || "/default-product.png"}
                    className="w-20 h-20 object-cover rounded-md"
                    alt={rental.product.name}
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">{rental.product.name}</h2>
                  <p>Category: {rental.product.category}</p>
                  <p>Owner: {rental.product.owner}</p> {/* ✅ Owner name displayed */}
                </div>
              </div>

              <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-sm">
                <p>From: {rental.startDate}</p>
                <p>To: {rental.endDate}</p>
                <p>Total Days: {rental.totalDays}</p>
              </div>
               
              <div>
                <p className="text-primary text-lg font-medium">
                  ₹{rental.product.pricePerDay}/day
                </p>
                <p>Deposit: ₹{rental.product.deposit}</p>
              </div>
              
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rentals;
