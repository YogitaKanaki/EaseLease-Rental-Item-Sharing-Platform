import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [evidence, setEvidence] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reason || !details) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("details", details);
    if (evidence) {
      formData.append("evidence", evidence);
    }

    console.log("Submitting:", {
      reason,
      details,
      evidence,
    });

    alert("Report submitted successfully!");
    navigate("/listings");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Report an Issue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Reason */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 outline-none"
            >
              <option value="">Select a reason</option>
              <option value="item_not_returned">Item Not Returned</option>
              <option value="damaged_item">Damaged Item</option>
              <option value="payment_issue">Payment Issue</option>
              <option value="misuse">Misuse of Item</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Additional Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue..."
              rows="4"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Evidence (optional)
            </label>
            <input
              type="file"
              onChange={(e) => setEvidence(e.target.files[0])}
              className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gray-200 file:text-gray-700
                         hover:file:bg-gray-300 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition duration-200"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reports;
