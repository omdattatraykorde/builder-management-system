import DailyProgressCard from "./DailyProgressCard";

function DailyProgressList({
  progressList,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Daily Progress
        </h2>

        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Progress
        </button>

      </div>

      {progressList.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No progress added yet.
        </div>
      ) : (
        <div className="space-y-5">

          {progressList.map((progress) => (
            <DailyProgressCard
              key={progress.id}
              progress={progress}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default DailyProgressList;