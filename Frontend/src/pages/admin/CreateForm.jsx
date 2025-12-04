import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import api from "../../api/axios";
import MySwal from "../../utils/swal";

const emptyField = {
  key: "",
  label: "",
  type: "text",
  required: false,
  options: [],
};

export default function CreateForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([{ ...emptyField }]);
  const [saving, setSaving] = useState(false);

  const addField = () => {
    setFields([...fields, { ...emptyField }]);
  };

  const removeField = (index) => {
    if (fields.length === 1) {
      return MySwal.fire({
        icon: "warning",
        title: "Field Required",
        text: "At least one field is required.",
      });
    }
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index, newData) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], ...newData };
    setFields(updated);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      return MySwal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please enter a title for your form.",
      });
    }
    if (fields.some((f) => !f.label.trim())) {
      return MySwal.fire({
        icon: "error",
        title: "Missing Label",
        text: "Each field must have a label.",
      });
    }

    setSaving(true);

    const normalizedFields = fields.map((f, i) => ({
      ...f,
      key: f.key.trim() || `field_${i + 1}`,
      options:
        f.type === "dropdown" || f.type === "multiselect"
          ? f.options.filter((o) => o.trim() !== "")
          : [],
    }));

    try {
      const { data } = await api.post("/forms", {
        title,
        description,
        fields: normalizedFields,
      });

      MySwal.fire({
        icon: "success",
        title: "Form Created",
        text: "Redirecting to guest management...",
        timer: 1300,
        showConfirmButton: false,
      });

      navigate(`/admin/forms/${data.form._id}/add-guest`);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to create form.",
      });
    }

    setSaving(false);
  };

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
          Create a New Form
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 space-y-10 border border-gray-100">
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-700 pb-1 border-b">
            Form Details
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Form Title
            </label>
            <input
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2  outline-none"
              placeholder="Enter form title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Description
            </label>
            <input
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none"
              placeholder="Short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700 pb-1 border-b">
              Form Fields
            </h2>

            <button
              onClick={addField}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition cursor-pointer"
            >
              <PlusCircle className="h-5 w-5" />
              Add Field
            </button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-6 bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-wrap gap-4 items-center">
                  <input
                    className="p-3 border rounded-lg w-40 shadow-sm focus:ring-2 outline-none"
                    placeholder="key"
                    value={field.key}
                    onChange={(e) =>
                      updateField(index, { key: e.target.value })
                    }
                  />

                  <input
                    className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 outline-none min-w-[200px]"
                    placeholder="Field label"
                    value={field.label}
                    onChange={(e) =>
                      updateField(index, { label: e.target.value })
                    }
                  />

                  <select
                    className="p-3 border rounded-lg shadow-sm focus:ring-2 outline-none cursor-pointer"
                    value={field.type}
                    onChange={(e) =>
                      updateField(index, { type: e.target.value })
                    }
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Text Area</option>
                    <option value="number">Number</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="multiselect">Multi Select</option>
                    <option value="date">Date</option>
                  </select>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(index, { required: e.target.checked })
                      }
                    />
                    Required
                  </label>

                  <button
                    onClick={() => removeField(index)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                </div>

                {(field.type === "dropdown" ||
                  field.type === "multiselect") && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Options (comma separated)
                    </label>
                    <input
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none"
                      placeholder="Yes, No, Maybe..."
                      value={field.options.join(",")}
                      onChange={(e) =>
                        updateField(index, {
                          options: e.target.value
                            .split(",")
                            .map((o) => o.trim()),
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-xl shadow hover:bg-indigo-500 disabled:opacity-50 transition font-semibold tracking-wide"
          >
            {saving ? "Saving..." : "Save Form"}
          </button>
        </div>
      </div>
    </div>
  );
}
