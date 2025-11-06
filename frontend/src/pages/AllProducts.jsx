import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products: contextProducts, currency } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Prepare products with proper Base64 prefix whenever contextProducts change
  useEffect(() => {
    if (!contextProducts) return;

    const fixedProducts = contextProducts.map(prod => ({
      ...prod,
      images: prod.images?.map(img =>
        img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
      ),
    }));

    setFilteredProducts(fixedProducts);
  }, [contextProducts]);

  // Handle search filter
  useEffect(() => {
    if (!contextProducts) return;

    if (searchQuery.length > 0) {
      const lower = searchQuery.toLowerCase();
      setFilteredProducts(contextProducts.filter(
        p =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      ));
    } else {
      const fixedProducts = contextProducts.map(prod => ({
        ...prod,
        images: prod.images?.map(img =>
          img.startsWith("data:image") ? img : `data:image/png;base64,${img}`
        ),
      }));
      setFilteredProducts(fixedProducts);
    }
  }, [searchQuery, contextProducts]);

  return (
    <div className="mt-16 flex flex-col px-4">
      {/* Header */}
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 col-span-full text-center mt-10">
          No products found.
        </p>
      )}
    </div>
  );
};

export default AllProducts;
