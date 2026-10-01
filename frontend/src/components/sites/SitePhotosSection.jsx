import { useEffect, useState } from "react";

import {
  getSitePhotos,
  createSitePhoto,
  deleteSitePhoto,
} from "../../services/sitePhotoService";

import SitePhotoGallery from "./SitePhotoGallery";
import SitePhotoForm from "./SitePhotoForm";
import ConfirmDialog from "../common/ConfirmDialog";

function SitePhotosSection({ projectId }) {
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [photoId, setPhotoId] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, [projectId]);

  const loadPhotos = async () => {
    try {
      const data = await getSitePhotos(projectId);
      setPhotos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      await createSitePhoto(data);

      setShowForm(false);
      loadPhotos();
    } catch (error) {
      console.error(error);
      alert("Failed to save photo.");
    }
  };

  const handleDeleteClick = (id) => {
    setPhotoId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSitePhoto(photoId);

      setShowDeleteDialog(false);
      setPhotoId(null);

      loadPhotos();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  return (
    <>
      <SitePhotoGallery
        photos={photos}
        onAdd={() => setShowForm(true)}
        onDelete={handleDeleteClick}
      />

      {showForm && (
        <SitePhotoForm
          projectId={projectId}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Photo"
        message="Are you sure you want to delete this photo?"
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setPhotoId(null);
        }}
      />
    </>
  );
}

export default SitePhotosSection;