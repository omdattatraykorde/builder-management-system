import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  createProject,
  updateProject,
} from "../../services/projectService";
import { getCustomers } from "../../services/customerService";

import projectStatus from "../../constants/projectStatus";

function ProjectForm({
  project,
  onClose,
  onSuccess,
}) {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    customer_id: "",
    location: "",
    budget: "",
    status: "Planning",
    start_date: "",
    end_date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();

    if (project) {
      setFormData({
        project_name: project.project_name || "",
        description: project.description || "",
        customer_id: project.customer_id || "",
        location: project.location || "",
        budget: project.budget || "",
        status: project.status || "Planning",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
      });
    }
  }, [project]);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load customers");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.project_name.trim()) {
      toast.error("Site name is required");
      return;
    }

    if (!formData.customer_id) {
      toast.error("Please select a customer");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        customer_id: Number(formData.customer_id),
        budget: Number(formData.budget || 0),
      };

      if (project) {
        await updateProject(project.id, payload);
        toast.success("Site updated successfully");
      } else {
        await createProject(payload);
        toast.success("Site created successfully");
      }

      await onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save site");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {project ? "Edit Site" : "Create New Site"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="project_name"
            placeholder="Site Name"
            value={formData.project_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="description"
            placeholder="Site Description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Customer</option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="location"
            placeholder="Site Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="budget"
              placeholder="Estimated Budget (₹)"
              value={formData.budget}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              {projectStatus.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <div className="flex justify-end gap-3 pt-2">

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
              {loading
                ? "Saving..."
                : project
                ? "Update Site"
                : "Create Site"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ProjectForm;