import api from "./api";

// ==========================
// Get All Payments
// ==========================
export const getPayments = async () => {
  const response = await api.get("/payments/");
  return response.data;
};

// ==========================
// Get Payment By ID
// ==========================
export const getPayment = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

// ==========================
// Create Payment
// ==========================
export const createPayment = async (payment) => {
  const response = await api.post("/payments/", payment);
  return response.data;
};

// ==========================
// Update Payment
// ==========================
export const updatePayment = async (id, payment) => {
  const response = await api.put(`/payments/${id}`, payment);
  return response.data;
};

// ==========================
// Delete Payment
// ==========================
export const deletePayment = async (id) => {
  const response = await api.delete(`/payments/${id}`);
  return response.data;
};