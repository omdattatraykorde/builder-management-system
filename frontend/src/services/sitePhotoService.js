import api from "./api";

// Get photos for a project
export const getSitePhotos = async (projectId) => {
  const response = await api.get(
    `/site-photos/project/${projectId}`
  );
  return response.data;
};

// Add photo
export const createSitePhoto = async (photo) => {
  const response = await api.post(
    "/site-photos",
    photo
  );
  return response.data;
};

// Update photo
export const updateSitePhoto = async (id, photo) => {
  const response = await api.put(
    `/site-photos/${id}`,
    photo
  );
  return response.data;
};

// Delete photo
export const deleteSitePhoto = async (id) => {
  const response = await api.delete(
    `/site-photos/${id}`
  );
  return response.data;
};