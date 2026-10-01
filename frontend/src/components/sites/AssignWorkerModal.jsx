import { useMemo, useState } from "react";

function AssignWorkerModal({
  workers,
  assignedWorkers,
  onAssign,
  onClose,
}) {
  const [search, setSearch] = useState("");

  const availableWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const assigned = assignedWorkers.some(
        (a) => Number(a.worker_id) === Number(worker.id)
      );

      const match =
        worker.full_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (worker.role || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      return !assigned && match;
    });
  }, [workers, assignedWorkers, search]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

        <div className="px-8 py-6 border-b flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold">
              Assign Worker
            </h2>

            <p className="text-gray-500 mt-1">
              Select a worker to assign to this site.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-600"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 mb-6"
          />

          <div className="max-h-[450px] overflow-y-auto space-y-4">

            {availableWorkers.length === 0 ? (

              <div className="text-center py-16 text-gray-500">
                No available workers.
              </div>

            ) : (

              availableWorkers.map((worker) => (

                <div
                  key={worker.id}
                  className="border rounded-2xl p-5 flex justify-between items-center hover:border-blue-500 hover:shadow-lg transition"
                >

                  <div className="flex gap-5">

                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                      👷
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {worker.full_name}
                      </h3>

                      <p className="text-gray-500">
                        {worker.role}
                      </p>

                      <div className="mt-3 text-sm space-y-1">

                        <p>📞 {worker.phone}</p>

                        <p>✉️ {worker.email}</p>

                        <p>💰 ₹ {worker.daily_wage}/day</p>

                      </div>

                    </div>

                  </div>

                  <button
                    onClick={() => onAssign(worker.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Assign
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AssignWorkerModal;