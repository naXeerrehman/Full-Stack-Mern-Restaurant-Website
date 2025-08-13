import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FastFood6 from "../../assets/FastFood6.jpg";
import Message from "../Message";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Reset link sent to your email. Please check your inbox.");
        setLoading(false); // Reset loading state
      } else {
        setMessage(data.message || "Error sending reset link.");
        setLoading(false); // Reset loading state
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img src={FastFood6} alt="FastFood_image" className="w-full h-full" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative mt-32 md:mt-72 lg:mt-28 px-12 md:px-44 lg:px-96"
      >
        <h1 className="bg-red-600 rounded-md text-center py-2 text-white text-xl font-bold">
          Reset Your Password
        </h1>
        <label className="text-white block mt-4 md:text-2xl">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          autoComplete="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm md:text-2xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 mb-2"
          required
        />
        <Message message={message} />
        <button
          type="submit"
          className={`bg-red-600 text-white px-4 py-2 md:text-2xl mt-4 rounded-md w-full ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
