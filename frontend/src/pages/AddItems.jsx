import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, categories } from "../assets/assets";
import toast, { Toaster } from "react-hot-toast";

const AddItems = () => {
  const { user, navigate } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [deposit, setDeposit] = useState("");

  // Convert image files to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Strip MIME prefix if needed
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in!");

    const finalCategory = category === "Other" ? customCategory : category;

    try {
      const base64Images = await Promise.all(
        files.filter(f => f).map(f => convertToBase64(f))
      );

      const productPayload = {
        name,
        description,
        category: finalCategory,
        pricePerDay: Number(pricePerDay),
        deposit: Number(deposit),
        ownerEmail: user.email,
        owner: user.name,
        images: base64Images, // list of Base64 strings
      };

      const res = await fetch("http://localhost:8080/api/product/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        navigate("/listings");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while adding product");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10">
      <Toaster position="top-right" />
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow rounded-lg p-6 max-w-lg w-full space-y-5"
      >
        <h2 className="text-xl font-bold">Add New Product</h2>

        {/* Images */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, idx) => (
                <label key={idx} className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[idx] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                  />
                  <img
                    src={
                      files[idx]
                        ? URL.createObjectURL(files[idx])
                        : assets.upload_area
                    }
                    alt="upload"
                    className="w-24 h-24 object-cover border rounded-md"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c, idx) => (
            <option key={idx} value={c.path}>
              {c.path}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        {/* Custom Category */}
        {category === "Other" && (
          <input
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        )}

        {/* Price & Deposit */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Price Per Day"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
            className="flex-1 px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            required
            className="flex-1 px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dull transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddItems;
