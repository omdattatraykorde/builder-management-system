import api from "./api";

// Get progress for a site
export const getDailyProgress = async (projectId) => {
  const response = await api.get(
    `/daily-progress/project/${projectId}`
  );
  return response.data;
};

// Add progress
export const createDailyProgress = async (data) => {
  const response = await api.post(
    "/daily-progress",
    data
  );
  return response.data;
};

// Update progress
export const updateDailyProgress = async (
  id,
  data
) => {
  const response = await api.put(
    `/daily-progress/${id}`,
    data
  );
  return response.data;
};

// Delete progress
export const deleteDailyProgress = async (id) => {
  const response = await api.delete(
    `/daily-progress/${id}`
  );
  return response.data;
};