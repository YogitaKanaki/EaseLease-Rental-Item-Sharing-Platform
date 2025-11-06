import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

const UpdateProfile = () => {
  const { user, setUser } = useAppContext(); // get logged-in user from context
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load user data when component mounts
  useEffect(() => {
    if (!user || !user.email) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/${user.email}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
          });
          setPreview(data.profileImage ? `data:image/*;base64,${data.profileImage}` : null);
        } else {
          toast.error("Failed to load user data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching user data");
      }
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => setPreview(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("address", formData.address);

      // Append image if changed
      if (preview && !preview.startsWith("http")) {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
          data.append("profileImage", fileInput.files[0]);
        }
      }

      const res = await fetch(
        `http://localhost:8080/api/user/${formData.email}/update`,
        {
          method: "POST",
          body: data,
        }
      );

      if (res.ok) {
        const updatedUser = await res.json();
        toast.success("Profile updated successfully!");

        // Update context so Navbar reflects new info
        setUser({
          ...user,
          name: updatedUser.name,
          profileImage: updatedUser.profileImage || user.profileImage,
        });

        // Update local form state
        setFormData({
          ...formData,
          name: updatedUser.name,
          phone: updatedUser.phone,
          address: updatedUser.address,
        });

        // Update preview
        setPreview(updatedUser.profileImage ? `data:image/*;base64,${updatedUser.profileImage}` : null);

      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Please login to update your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden relative">
            <img
              src={preview || "/default-profile.png"} // default image if none
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-3 flex space-x-3">
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {preview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email (cannot edit)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
