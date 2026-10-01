import { useEffect, useMemo, useState } from "react";

import {
  createPayment,
  updatePayment,
} from "../../services/paymentService";

import { getCustomers } from "../../services/customerService";
import { getProjects } from "../../services/projectService";

function PaymentForm({
  payment,
  onClose,
  onSuccess,
}) {
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    project_id: "",
    amount: "",
    payment_method: "Cash",
    payment_date: new Date().toISOString().split("T")[0],
    transaction_id: "",
    status: "Completed",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
    loadProjects();
  }, []);

  useEffect(() => {
    if (payment) {
      setFormData({
        customer_id: payment.customer_id || "",
        project_id: payment.project_id || "",
        amount: payment.amount || "",
        payment_method: payment.payment_method || "Cash",
        payment_date:
          payment.payment_date ||
          new Date().toISOString().split("T")[0],
        transaction_id: payment.transaction_id || "",
        status: payment.status || "Completed",
        remarks: payment.remarks || "",
      });
    }
  }, [payment]);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Only show projects of selected customer
  const filteredProjects = useMemo(() => {
    if (!formData.customer_id) return [];

    return projects.filter(
      (project) =>
        Number(project.customer_id) ===
        Number(formData.customer_id)
    );
  }, [projects, formData.customer_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "customer_id"
        ? {
            project_id: "",
          }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_id) {
      alert("Please select customer");
      return;
    }

    if (!formData.project_id) {
      alert("Please select project");
      return;
    }

    if (!formData.amount) {
      alert("Please enter payment amount");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        customer_id: Number(formData.customer_id),
        project_id: Number(formData.project_id),
        amount: Number(formData.amount),
      };

      if (payment) {
        await updatePayment(payment.id, payload);
      } else {
        await createPayment(payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {payment ? "Edit Payment" : "Add Payment"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Customer */}

          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>

          {/* Project */}

          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
            disabled={!formData.customer_id}
          >
            <option value="">
              {formData.customer_id
                ? "Select Project"
                : "Select Customer First"}
            </option>

            {filteredProjects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.project_name}
              </option>
            ))}
          </select>

          {/* Amount */}

          <input
            type="number"
            name="amount"
            placeholder="Payment Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            {/* Payment Method */}

            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">
                Bank Transfer
              </option>
              <option value="Cheque">
                Cheque
              </option>
            </select>

            {/* Payment Date */}

            <input
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

          </div>

          {/* Transaction */}

          <input
            type="text"
            name="transaction_id"
            placeholder="Transaction ID"
            value={formData.transaction_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          {/* Status */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Completed">
              Completed
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {/* Remarks */}

          <textarea
            rows={3}
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

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
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default PaymentForm;