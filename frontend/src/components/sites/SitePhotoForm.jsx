import { useState } from "react";
import { uploadImage } from "../../services/uploadService";

function SitePhotoForm({
  projectId,
  onClose,
  onSave,
}) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose a photo.");
      return;
    }

    try {
      setLoading(true);

      const upload = await uploadImage(file);

      await onSave({
        project_id: Number(projectId),
        image_url: upload.image_url,
        caption,
      });
    } catch (error) {
      console.error(error);
      alert("Photo upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Upload Site Photo
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Choose Photo */}
          <div>

            <label className="block mb-2 font-medium">
              Choose Photo
            </label>

            <label
              htmlFor="photo-upload"
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
            >

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-52 object-cover rounded-lg mb-4"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-blue-500 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 014-4h1m4 0h5a4 4 0 010 8H7a4 4 0 01-4-4zm9-8v8m0 0l-3-3m3 3l3-3"
                    />
                  </svg>

                  <p className="font-semibold text-lg">
                    Click to choose a photo
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    JPG, JPEG, PNG
                  </p>
                </>
              )}

              {file && (
                <p className="mt-4 text-green-600 font-medium">
                  ✓ {file.name}
                </p>
              )}

            </label>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

          </div>

          {/* Caption */}
          <div>

            <label className="block mb-2 font-medium">
              Caption
            </label>

            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Photo description"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default SitePhotoForm;