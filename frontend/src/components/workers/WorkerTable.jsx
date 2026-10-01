function WorkerTable({ workers, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Worker</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Daily Wage</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {workers.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-6 text-gray-500"
              >
                No Workers Found
              </td>
            </tr>
          ) : (
            workers.map((worker) => (
              <tr
                key={worker.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{worker.id}</td>

                <td className="px-4 py-3 font-medium">
                  {worker.full_name}
                </td>

                <td className="px-4 py-3">
                  {worker.role}
                </td>

                <td className="px-4 py-3">
                  {worker.phone}
                </td>

                <td className="px-4 py-3">
                  {worker.email}
                </td>

                <td className="px-4 py-3">
                  ₹ {worker.daily_wage}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      worker.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {worker.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(worker)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(worker.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WorkerTable;