import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import MySwal from "../../utils/swal";

const GuestForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const { data } = await api.get(`/forms/token/${token}`);
        setFormData(data);

        const defaultValues = {};
        data.form.fields.forEach((field) => {
          defaultValues[field.key] = field.type === "multiselect" ? [] : "";
        });
        setResponses(defaultValues);
      } catch (error) {
        MySwal.fire({
          icon: "warning",
          title: "Invalid Link",
          text: error.response?.data?.message || error.message,
        });

        navigate("/");
      }
      setLoading(false);
    };

    fetchForm();
  }, [token]);

  const handleChange = (key, value) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const missing = formData.form.fields.filter(
      (f) => f.required && !responses[f.key]
    );

    if (missing.length > 0) {
      return MySwal.fire({
        icon: "warning",
        title: "Missing Required Fields",
        text: "Please fill all required questions.",
      });
    }

    try {
      await api.post(`/forms/${formData.form._id}/response`, {
        token,
        responses,
      });

      MySwal.fire({
        icon: "success",
        title: "Response Submitted!",
        text: "Thank you for filling out the form.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/thank-you");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Submit Failed",
        text: error.message,
      });
    }
  };

  if (loading || !formData) {
    return (
      <div className="text-center py-20 text-gray-600">Loading Form...</div>
    );
  }

  const { form, guest } = formData;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className=" bg-white shadow-lg rounded-xl border-t-8 border-indigo-600 p-8">
          <h1 className="text-3xl font-semibold text-gray-800">{form.title}</h1>
          <p className="text-gray-500 mt-2">{form.description}</p>

          <p className="text-sm text-gray-600 mt-4">
            Responding as: <span className="font-medium">{guest.email}</span>
          </p>

          <hr className="my-10 h-1 bg-indigo-600 rounded-full border-none" />
          {form.fields.map((field) => (
            <div key={field.key} className="border-b pb-6">
              <label className="block text-lg font-medium text-gray-800 mb-2">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={responses[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={responses[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}

              {field.type === "date" && (
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={responses[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  rows="3"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={responses[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}

              {field.type === "dropdown" && (
                <select
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={responses[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "multiselect" && (
                <div className="space-y-2">
                  {field.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-indigo-600"
                        checked={responses[field.key]?.includes(opt)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Add option to array
                            handleChange(field.key, [
                              ...responses[field.key],
                              opt,
                            ]);
                          } else {
                            // Remove option from array
                            handleChange(
                              field.key,
                              responses[field.key].filter(
                                (item) => item !== opt
                              )
                            );
                          }
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="text-center pt-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-lg shadow hover:bg-indigo-500 transition font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
