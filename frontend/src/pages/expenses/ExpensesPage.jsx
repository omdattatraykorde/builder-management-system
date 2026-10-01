import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import ExpenseTable from "../../components/expenses/ExpenseTable";
import ExpenseForm from "../../components/expenses/ExpenseForm";

import {
  getExpenses,
  deleteExpense,
} from "../../services/expenseService";

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [search, setSearch] = useState("");

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      toast.success("Expense deleted successfully");
      loadExpenses();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setShowForm(true);
  };

  const filteredExpenses = useMemo(() => {
    const keyword = search.toLowerCase();

    return expenses.filter((expense) =>
      [
        expense.expense_title,
        expense.category,
        expense.payment_method,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [expenses, search]);

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Expenses...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Expenses
        </h1>

        <button
          onClick={handleAddExpense}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Expense
        </button>

      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-5">

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ExpenseForm
          expense={selectedExpense}
          onClose={() => {
            setShowForm(false);
            setSelectedExpense(null);
          }}
          onSuccess={loadExpenses}
        />
      )}

    </div>
  );
}

export default ExpensesPage;