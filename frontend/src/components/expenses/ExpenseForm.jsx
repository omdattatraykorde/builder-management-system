import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  createExpense,
  updateExpense,
} from "../../services/expenseService";

import { getProjects } from "../../services/projectService";

import expenseCategories from "../../constants/expenseCategories";
import paymentMethods from "../../constants/paymentMethods";

function ExpenseForm({
  expense,
  onClose,
  onSuccess,
}) {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    expense_title: "",
    category: "",
    amount: "",
    expense_date: "",
    payment_method: "",
    description: "",
    project_id: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();

    if (expense) {
      setFormData({
        expense_title: expense.expense_title || "",
        category: expense.category || "",
        amount: expense.amount || "",
        expense_date: expense.expense_date || "",
        payment_method: expense.payment_method || "",
        description: expense.description || "",
        project_id: expense.project_id || "",
      });
    }
  }, [expense]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
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

    if (!formData.expense_title.trim()) {
      toast.error("Expense title is required");
      return;
    }

    if (!formData.category) {
      toast.error("Please select an expense category");
      return;
    }

    if (!formData.payment_method) {
      toast.error("Please select a payment method");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount || 0),
        project_id: formData.project_id
          ? Number(formData.project_id)
          : null,
      };

      if (expense) {
        await updateExpense(expense.id, payload);
        toast.success("Expense updated successfully");
      } else {
        await createExpense(payload);
        toast.success("Expense added successfully");
      }

      await onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="expense_title"
            placeholder="Expense Title"
            value={formData.expense_title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Category</option>

              {expenseCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Payment Method</option>

              {paymentMethods.map((method) => (
                <option
                  key={method}
                  value={method}
                >
                  {method}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="expense_date"
              value={formData.expense_date}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Project (Optional)</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.project_name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            value={formData.description}
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
              {loading ? "Saving..." : expense ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ExpenseForm;