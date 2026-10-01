import { useEffect, useState } from "react";

function DailyProgressForm({
  projectId,
  progress = null,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    progress_date: "",
    work_done: "",
    issues: "",
    tomorrow_plan: "",
  });

  useEffect(() => {
    if (progress) {
      setFormData({
        progress_date: progress.progress_date || "",
        work_done: progress.work_done || "",
        issues: progress.issues || "",
        tomorrow_plan: progress.tomorrow_plan || "",
      });
    }
  }, [progress]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.progress_date.trim()) {
      alert("Please select a date.");
      return;
    }

    if (!formData.work_done.trim()) {
      alert("Please enter today's work.");
      return;
    }

    onSave({
      ...formData,
      project_id: Number(projectId),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {progress ? "Edit Daily Progress" : "Add Daily Progress"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="date"
              name="progress_date"
              value={formData.progress_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Work Done
            </label>

            <textarea
              rows="4"
              name="work_done"
              value={formData.work_done}
              onChange={handleChange}
              placeholder="Describe today's work..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Issues
            </label>

            <textarea
              rows="3"
              name="issues"
              value={formData.issues}
              onChange={handleChange}
              placeholder="Any issues today?"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Tomorrow's Plan
            </label>

            <textarea
              rows="3"
              name="tomorrow_plan"
              value={formData.tomorrow_plan}
              onChange={handleChange}
              placeholder="Planned work for tomorrow..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {progress ? "Update Progress" : "Save Progress"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default DailyProgressForm;