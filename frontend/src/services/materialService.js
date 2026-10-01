import api from "./api";

// Get all materials
export const getMaterials = async () => {
  const response = await api.get("/materials");
  return response.data;
};

// Get one material
export const getMaterial = async (id) => {
  const response = await api.get(`/materials/${id}`);
  return response.data;
};

// Create material
export const createMaterial = async (material) => {
  const response = await api.post("/materials", material);
  return response.data;
};

// Update material
export const updateMaterial = async (id, material) => {
  const response = await api.put(`/materials/${id}`, material);
  return response.data;
};

// Delete material
export const deleteMaterial = async (id) => {
  const response = await api.delete(`/materials/${id}`);
  return response.data;
};