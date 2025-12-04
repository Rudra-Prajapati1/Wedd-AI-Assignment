import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl w-full text-center animate-fadeIn border-t-8 border-red-500">
        <div className="flex justify-center mb-6">
          <SearchX className="w-20 h-20 text-red-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800">404</h1>

        <p className="text-xl font-medium text-gray-700 mt-2">Page Not Found</p>

        <p className="text-gray-500 mt-3">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition font-semibold"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
