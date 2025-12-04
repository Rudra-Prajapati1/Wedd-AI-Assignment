import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MySwal from "../utils/swal";
import api from "../api/axios";

const FormCard = ({ form, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = await MySwal.fire({
      icon: "warning",
      title: "Delete Form?",
      text: "This action cannot be undone. All guests and responses will also be deleted.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      setDeleting(true);

      const { data } = await api.delete(`/forms/${form._id}`);

      MySwal.fire({
        icon: "success",
        title: "Deleted!",
        text: data.message,
      });

      onDelete(form._id);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{form.title}</h3>
          <p className="text-gray-500 mt-1 text-sm">{form.description}</p>
        </div>
        <button disabled={deleting} onClick={handleDelete}>
          <Trash2 className="text-red-600 hover:text-red-700 cursor-pointer" />
        </button>
      </div>
      <div className="mt-4 flex gap-3">
        <Link
          to={`/admin/forms/${form._id}/add-guest`}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm shadow hover:bg-blue-500 transition"
        >
          Add Guest
        </Link>
        <Link
          to={`/admin/forms/${form._id}/responses`}
          className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm shadow hover:bg-emerald-500 transition"
        >
          View Responses
        </Link>
      </div>
    </div>
  );
};

export default FormCard;
