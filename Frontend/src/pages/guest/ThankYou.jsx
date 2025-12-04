import React from "react";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full text-center border-t-8 border-indigo-600 animate-fadeIn">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800">Thank You!</h1>

        <p className="text-gray-600 mt-3 text-lg">
          Your response has been recorded successfully.
        </p>

        <p className="text-gray-500 mt-1 text-sm">
          You may now close this window.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
