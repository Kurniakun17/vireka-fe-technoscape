import React from "react";

export default function Header() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
            Gambaran Kesehatan Nasional
          </h1>
          <p className="text-gray-600 text-lg">
            Wawasan real-time tentang ekosistem kesehatan Indonesia
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-6 py-3 bg-white rounded-xl  border border-gray-200">
            <span className="text-sm text-gray-600">Terakhir Diperbarui:</span>
            <span className="ml-2 font-medium text-gray-900">
              {new Date().toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
