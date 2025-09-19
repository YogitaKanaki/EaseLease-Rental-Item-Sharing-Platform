import React from "react";

const Help = () => {
  const faqs = [
    {
      q: "How do I rent an item?",
      a: "Browse the listings, select an item, and click 'Rent Now' to proceed."
    },
    {
      q: "How do I list an item?",
      a: "Go to 'Add Items', fill in the details, upload images, and publish your listing."
    },
    {
      q: "What if I face issues during rental?",
      a: "You can raise a complaint under 'Help' or contact support directly."
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      {/* Title */}
      <h1 className="text-4xl font-bold text-purple-600 mb-6">Help & FAQs</h1>
      <p className="mb-6 text-lg">Here are answers to some common questions:</p>

      {/* FAQs */}
      <div className="space-y-6 mb-10">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6 bg-purple-50 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">{faq.q}</h2>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Complaint Section */}
      <div className="p-6 bg-red-50 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Raise a Complaint</h2>
        <p className="mb-4 text-gray-600">
          Facing an issue? Let us know and we’ll resolve it quickly.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          />
          <textarea
            placeholder="Describe your issue..."
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Help;
