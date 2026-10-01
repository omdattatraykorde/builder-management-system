import api from "./api";

/**
 * Get all Sites
 */
export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

/**
 * Get Site by ID
 */
export const getProject = async (id) => {
  const response = await api.get(
    `/projects/${id}`
  );

  return response.data;
};

/**
 * Create Site
 */
export const createProject = async (projectData) => {
  const response = await api.post(
    "/projects",
    projectData
  );

  return response.data;
};

/**
 * Update Site
 */
export const updateProject = async (
  id,
  projectData
) => {
  const response = await api.put(
    `/projects/${id}`,
    projectData
  );

  return response.data;
};

/**
 * Delete Site
 */
export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);

  return true;
};