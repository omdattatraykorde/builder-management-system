import api from "./api";

// Dashboard Statistics
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

// Monthly Expense Chart
export const getMonthlyExpenses = async () => {
  const response = await api.get("/dashboard/monthly-expenses");
  return response.data;
};