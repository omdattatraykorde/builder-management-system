import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { changePassword } from "../../services/authService";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await changePassword(
        form.currentPassword,
        form.newPassword
      );

      toast.success("Password changed successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow">

        <div className="border-b px-8 py-6">
          <h1 className="text-3xl font-bold">
            Change Password
          </h1>

          <p className="text-gray-500 mt-2">
            Update your account password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-5"
        >

          {/* Current Password */}
          <div>

            <label className="block mb-2 font-medium">
              Current Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-11 pr-12 focus:border-blue-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(!showCurrent)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showCurrent ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}
          <div>

            <label className="block mb-2 font-medium">
              New Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-11 pr-12 focus:border-blue-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-xl py-3 pl-11 pr-12 focus:border-blue-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Updating..."
              : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
}