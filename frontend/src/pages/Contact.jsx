import React from "react";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>
      <p className="mb-6 text-lg">We’d love to hear from you! Reach out to us through any of the channels below:</p>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="p-6 bg-blue-50 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">📧 Email</h2>
          <a href="mailto:support@easelease.com" className="text-blue-600 hover:underline">
            support@easelease.com
          </a>
        </div>

        <div className="p-6 bg-blue-50 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">📞 Phone</h2>
          <a href="tel:+919876543210" className="text-blue-600 hover:underline">
            +91 98765 43210
          </a>
        </div>

        <div className="p-6 bg-blue-50 rounded-xl shadow sm:col-span-2">
          <h2 className="text-xl font-semibold mb-3">📍 Address</h2>
          <a
            href="https://maps.google.com/?q=Pune,+Maharashtra,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Pune, Maharashtra, India
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
