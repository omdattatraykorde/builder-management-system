import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  createWorker,
  updateWorker,
} from "../../services/workerService";

import workerRoles from "../../constants/workerRoles";

function WorkerForm({
  worker,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    role: "",
    daily_wage: "",
    joining_date: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (worker) {
      setFormData({
        full_name: worker.full_name || "",
        phone: worker.phone || "",
        email: worker.email || "",
        address: worker.address || "",
        role: worker.role || "",
        daily_wage: worker.daily_wage || "",
        joining_date: worker.joining_date || "",
        status: worker.status || "Active",
      });
    }
  }, [worker]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      toast.error("Worker name is required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        daily_wage: Number(formData.daily_wage || 0),
      };

      if (worker) {
        await updateWorker(worker.id, payload);
        toast.success("Worker updated successfully");
      } else {
        await createWorker(payload);
        toast.success("Worker added successfully");
      }

      await onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save worker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {worker ? "Edit Worker" : "Add Worker"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="full_name"
            placeholder="Worker Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Role</option>

              {workerRoles.map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="daily_wage"
              placeholder="Daily Wage"
              value={formData.daily_wage}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : worker ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default WorkerForm;