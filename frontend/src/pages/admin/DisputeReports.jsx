import React from "react";

const DisputeReports = () => {
  const reports = [
    {
      id: "REP001",
      type: "Damaged Item",
      item: "Canon DSLR Camera",
      owner: "John Doe",
      renter: "Alice Smith",
      description: "Lens damaged upon return",
      evidence: ["https://via.placeholder.com/80"],
      status: "Pending"
    },
    {
      id: "REP002",
      type: "Late Return",
      item: "Mountain Bike",
      owner: "Sarah Lee",
      renter: "Mark Wilson",
      description: "Returned 2 days late",
      evidence: ["https://via.placeholder.com/80"],
      status: "Resolved"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Dispute & Report Handling</h2>
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-4 flex justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-lg font-semibold">{report.type}</h3>
              <p className="text-sm text-gray-500">Item: {report.item}</p>
              <p className="text-sm text-gray-500">Owner: {report.owner}</p>
              <p className="text-sm text-gray-500">Renter: {report.renter}</p>
              <p className="text-sm text-gray-500">Description: {report.description}</p>
              <div className="flex gap-2 mt-2">
                {report.evidence.map((img, index) => (
                  <img key={index} src={img} alt="Evidence" className="w-16 h-16 rounded object-cover" />
                ))}
              </div>
              <p className={`text-sm font-semibold mt-2 ${report.status === "Resolved" ? "text-green-600" : "text-yellow-600"}`}>
                Status: {report.status}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">Resolve</button>
              <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Penalize</button>
              <button className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Warn</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputeReports;
