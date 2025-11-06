import React from "react";

const DisputeReports = () => {
  const reports = [
    {
      id: "REP001",
      type: "Damaged Item",
      item: "Camp Tent",
      owner: "Soujanya Sakinal",
      renter: "Amruta Kedari",
      description: "The tent was torn",
      evidence: ["https://via.placeholder.com/80"],
      
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
             <div className="flex gap-3">
  <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
    Resolve
  </button>
  <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
    Penalize
  </button>
  <button className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
    Warn
  </button>
</div>
              
            </div>
            
              
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputeReports;
