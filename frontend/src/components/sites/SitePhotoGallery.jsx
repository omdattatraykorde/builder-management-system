const API_BASE = "http://127.0.0.1:8000";

function SitePhotoGallery({
  photos,
  onAdd,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Site Photos
        </h2>

        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Photo
        </button>

      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No site photos available.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-xl shadow border overflow-hidden"
            >

              <img
                src={`${API_BASE}/${photo.image_url}`}
                alt={photo.caption}
                className="w-full h-48 object-cover"
              />

              <div className="p-3">

                <p className="font-medium mb-3">
                  {photo.caption || "No Caption"}
                </p>

                <button
                  onClick={() => onDelete(photo.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SitePhotoGallery;