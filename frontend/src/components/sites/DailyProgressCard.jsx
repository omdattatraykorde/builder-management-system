import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaArrowRight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function DailyProgressCard({
  progress,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          <FaCalendarAlt />
          <span>{progress.progress_date}</span>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(progress)}
            className="w-9 h-9 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(progress.id)}
            className="w-9 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
          >
            <FaTrash />
          </button>

        </div>

      </div>

      {/* Work Done */}
      <div className="mb-5">

        <div className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
          <FaClipboardCheck className="text-green-600" />
          Work Done
        </div>

        <p className="text-gray-700 leading-7">
          {progress.work_done}
        </p>

      </div>

      {/* Issues */}
      {progress.issues && (
        <div className="mb-5">

          <div className="flex items-center gap-2 font-semibold text-red-600 mb-2">
            <FaExclamationTriangle />
            Issues
          </div>

          <p className="text-gray-700">
            {progress.issues}
          </p>

        </div>
      )}

      {/* Tomorrow Plan */}
      {progress.tomorrow_plan && (
        <div>

          <div className="flex items-center gap-2 font-semibold text-blue-600 mb-2">
            <FaArrowRight />
            Tomorrow Plan
          </div>

          <p className="text-gray-700">
            {progress.tomorrow_plan}
          </p>

        </div>
      )}

    </div>
  );
}

export default DailyProgressCard;