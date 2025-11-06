import React from "react";
import { useAppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { navigate, currency } = useAppContext();

  const goToDetails = () => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    scrollTo(0, 0);
  };

  // Handle image: make sure MIME type is included
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0].startsWith("data:image")
        ? product.images[0]
        : `data:image/png;base64,${product.images[0]}`
      : "/default-product.png"; // fallback image

  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-white hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Image */}
      <div className="flex items-center justify-center h-48">
        <img
          src={productImage}
          alt={product.name}
          className="max-h-full object-contain rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col justify-between h-36">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            {product.category}
          </p>
          <p className="text-gray-800 font-semibold text-lg truncate mt-1">
            {product.name}
          </p>
          <p className="text-primary font-bold text-lg mt-2">
            {currency}
            {product.pricePerDay}{" "}
            <span className="text-gray-400 text-sm ml-1">
              {currency}
              {product.deposit}
            </span>
          </p>
        </div>

        {/* Rent Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToDetails();
          }}
          className="mt-3 flex items-center cursor-pointer justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition font-medium"
        >
          <ShoppingCart className="w-4 h-4" />
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
