import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MySwal from "../../utils/swal";
import api from "../../api/axios";
import { ArrowLeft, Copy, Link2, Send, PlusCircle } from "lucide-react";

const AddGuest = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [guests, setGuests] = useState([{ name: "", email: "" }]);
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGuestChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const addNewGuestField = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  const handleGenerateLinks = async () => {
    for (const g of guests) {
      if (!g.email.trim()) {
        return MySwal.fire({
          icon: "warning",
          title: "Email Missing",
          text: "Every guest must have an email.",
        });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const g of guests) {
      if (!emailRegex.test(g.email)) {
        return MySwal.fire({
          icon: "warning",
          title: "Invalid Email",
          text: `Invalid email: ${g.email}`,
        });
      }
    }

    setLoading(true);

    try {
      const links = [];

      for (const g of guests) {
        const { data } = await api.post(`/forms/${formId}/guests`, {
          name: g.name,
          email: g.email,
        });
        links.push({ email: g.email, url: data.url });
      }

      setGeneratedLinks(links);

      MySwal.fire({
        icon: "success",
        title: "Links Generated!",
        text: "Unique form links generated for all guests.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Could not generate links.",
      });
    }

    setLoading(false);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    MySwal.fire({
      icon: "success",
      title: "Copied!",
      text: "Invitation link copied to clipboard.",
      timer: 1000,
      showConfirmButton: false,
    });
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
          Add Guests
        </h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-8">
        {/* Input rows */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-700 pb-1 border-b">
            Guest Information
          </h2>

          {guests.map((guest, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl bg-gray-50 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Guest Name (Optional)
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none"
                  placeholder="Enter guest name..."
                  value={guest.name}
                  onChange={(e) =>
                    handleGuestChange(index, "name", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Guest Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none"
                  placeholder="Enter guest email..."
                  value={guest.email}
                  onChange={(e) =>
                    handleGuestChange(index, "email", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button
            onClick={addNewGuestField}
            className="flex items-center gap-2 text-indigo-600 font-semibold mt-2 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            Add Another Guest
          </button>
        </section>

        <div className="text-right">
          <button
            onClick={handleGenerateLinks}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-500 transition text-lg font-semibold disabled:opacity-50 mx-auto cursor-pointer"
          >
            <Send className="w-5 h-5" />
            {loading ? "Generating..." : "Generate All Links"}
          </button>
        </div>

        {generatedLinks.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner space-y-4">
            <div className="flex items-center gap-3">
              <Link2 className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-800">
                Generated Invitation Links
              </span>
            </div>

            {generatedLinks.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-lg shadow flex flex-col gap-2"
              >
                <p className="text-gray-800 font-medium">{item.email}</p>

                <p className="text-gray-700 break-all text-sm">{item.url}</p>

                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="flex items-center cursor-pointer gap-2 px-3 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition text-xs self-start"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGuest;
