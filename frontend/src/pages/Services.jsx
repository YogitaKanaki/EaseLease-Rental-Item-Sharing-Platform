import React from "react";
import { CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    "List your items for rent securely",
    "Browse verified rental items",
    "Track and manage active rentals",
    "Safe payments and receipts",
    "24/7 customer support",
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Our Services</h1>
      <p className="text-lg mb-6">EaseLease offers everything you need to rent and lend items with confidence:</p>
      <ul className="space-y-4">
        {services.map((service, index) => (
          <li key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow-sm">
            <CheckCircle className="text-green-500" />
            <span className="text-base">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
