import api from "./api";

// Get all expenses
export const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

// Get one expense
export const getExpense = async (id) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

// Create expense
export const createExpense = async (expense) => {
  const response = await api.post("/expenses", expense);
  return response.data;
};

// Update expense
export const updateExpense = async (id, expense) => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};