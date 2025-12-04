import React from "react";
import { Route, Routes } from "react-router-dom";
import FormList from "./pages/admin/FormList";
import CreateForm from "./pages/admin/CreateForm";
import AddGuest from "./pages/admin/AddGuest";
import Responses from "./pages/admin/Responses";
import GuestForm from "./pages/guest/GuestForm";
import ThankYou from "./pages/guest/ThankYou";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="px-16 mt-10">
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/admin/create" element={<CreateForm />} />
          <Route path="/admin/forms/:formId/add-guest" element={<AddGuest />} />
          <Route
            path="/admin/forms/:formId/responses"
            element={<Responses />}
          />

          <Route path="/form/:token" element={<GuestForm />} />
          <Route path="/thank-you" element={<ThankYou />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    </main>
  );
};

export default App;
