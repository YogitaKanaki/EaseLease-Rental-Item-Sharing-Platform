import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">About EaseLease</h1>
      <p className="text-lg leading-relaxed">
        EaseLease is a modern rental item sharing platform that empowers communities 
        to share resources efficiently. Whether you want to rent out items or borrow 
        them, our platform makes the process simple, secure, and sustainable.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-8">
        <div className="p-6 bg-indigo-50 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p>To make rentals hassle-free and affordable while promoting eco-friendly living.</p>
        </div>
        <div className="p-6 bg-indigo-50 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p>To build the most trusted rental ecosystem for communities worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
