import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

import { forgotPassword } from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await forgotPassword(email);

      setMessage(response.message);

      // Temporary for development
      if (response.reset_token) {
        console.log(
          "Reset Token:",
          response.reset_token
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to process request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl shadow-lg">
            <FaBuilding />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your registered email to receive a password reset link.
        </p>

        {message && (
          <div className="mb-5 rounded-xl bg-green-100 border border-green-200 p-3 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl bg-red-100 border border-red-200 p-3 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-3">

          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaArrowLeft />
            Back to Login
          </Link>

          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}