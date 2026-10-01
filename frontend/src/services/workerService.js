import api from "./api";

// Get all workers
export const getWorkers = async () => {
  const response = await api.get("/workers");
  return response.data;
};

// Get one worker
export const getWorker = async (id) => {
  const response = await api.get(`/workers/${id}`);
  return response.data;
};

// Create worker
export const createWorker = async (worker) => {
  const response = await api.post("/workers", worker);
  return response.data;
};

// Update worker
export const updateWorker = async (id, worker) => {
  const response = await api.put(`/workers/${id}`, worker);
  return response.data;
};

// Delete worker
export const deleteWorker = async (id) => {
  const response = await api.delete(`/workers/${id}`);
  return response.data;
};