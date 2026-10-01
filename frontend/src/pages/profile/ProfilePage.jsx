import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
} from "react-icons/fa";

import { updateProfile } from "../../services/authService";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser(storedUser);

    setForm({
      full_name: storedUser.name || "",
      phone: storedUser.phone || "",
    });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedUser = await updateProfile(
        form.full_name,
        form.phone
      );

      const newUser = {
        ...user,
        name: updatedUser.full_name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      );

      setUser(newUser);

      toast.success("Profile updated successfully.");

    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow">

        <div className="border-b px-8 py-6">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <FaUser size={32} />
            </div>

            <div>

              <h2 className="text-2xl font-semibold">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.role}
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
                />

              </div>

            </div>

            {/* Phone */}
            <div>

              <label className="block mb-2 font-medium">
                Phone
              </label>

              <div className="relative">

                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border rounded-xl py-3 pl-11 pr-4 bg-gray-100"
                />

              </div>

            </div>

            {/* Role */}
            <div>

              <label className="block mb-2 font-medium">
                Role
              </label>

              <div className="relative">

                <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={user.role}
                  readOnly
                  className="w-full border rounded-xl py-3 pl-11 pr-4 bg-gray-100"
                />

              </div>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}