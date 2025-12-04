import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MySwal from "../../utils/swal";
import api from "../../api/axios";
import { ArrowLeft } from "lucide-react";

const Responses = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResponses = async () => {
    try {
      const { data } = await api.get(`/forms/${formId}/responses`);
      setResponses(data);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error Fetching Responses",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const fetchFromDetails = async () => {
    try {
      const { data } = await api.get(`/forms/${formId}`);
      setForm(data);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error Fetching Form",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  useEffect(() => {
    Promise.all([fetchFromDetails(), fetchResponses()]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Form Responses
        </h1>
      </div>

      {form && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">{form.title}</h2>
          <p className="text-gray-500 mt-1">{form.description}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading Responses...
        </div>
      )}

      {!loading && responses.length === 0 && (
        <div className="text-center bg-white p-10 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            No Responses Yet
          </h2>
          <p className="text-gray-500 mt-2">
            Respones will appear here once guests submit the form.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {responses.map((response) => (
          <div
            key={response._id}
            className="bg-white p-6 rounded-xl shadow border border-gray-100"
          >
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {response.guestId?.name || "Unknown Guest"}
                </h3>
                <p className="text-sm text-gray-500">
                  {response.guestId?.email}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {new Date(response.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(response.responses).map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 bg-gray-50 rounded-lg border shadow-sm"
                >
                  <p className="text-sm font-semibold text-gray-700">{key}</p>
                  <p className="text-gray-800 mt-1">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
