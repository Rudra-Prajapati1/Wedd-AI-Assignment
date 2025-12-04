import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import api from "../../api/axios";
import MySwal from "../../utils/swal";
import FormCard from "../../components/FormCard";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    try {
      const { data } = await api.get("/forms");
      setForms(data);
      setLoading(false);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error Fetching Forms",
        text: error.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setForms((prev) => prev.filter((f) => f._id !== id));
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Your Forms
        </h1>

        <Link
          to="/admin/create"
          className="flex items-center gap-3 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Form
        </Link>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500">Loading forms...</div>
      )}

      {!loading && forms.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            No forms created yet
          </h2>
          <p className="text-gray-500 mt-2">
            Click the button above to create your first dynamic form.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forms.map((form) => (
          <FormCard key={form._id} form={form} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default FormList;
