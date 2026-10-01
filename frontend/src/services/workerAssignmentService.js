import api from "./api";

// Get workers assigned to a project
export const getAssignedWorkers = async (projectId) => {
  const response = await api.get(
    `/worker-assignments/project/${projectId}`
  );

  return response.data;
};

// Assign worker
export const assignWorker = async (data) => {
  const response = await api.post(
    "/worker-assignments",
    data
  );

  return response.data;
};

// Remove worker
export const removeWorker = async (assignmentId) => {
  const response = await api.delete(
    `/worker-assignments/${assignmentId}`
  );

  return response.data;
};