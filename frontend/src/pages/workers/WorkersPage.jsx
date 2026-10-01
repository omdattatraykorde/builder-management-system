import { useEffect, useMemo, useState } from "react";

import WorkerTable from "../../components/workers/WorkerTable";
import WorkerForm from "../../components/workers/WorkerForm";

import {
  getWorkers,
  deleteWorker,
} from "../../services/workerService";

function WorkersPage() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [search, setSearch] = useState("");

  const loadWorkers = async () => {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this worker?"
    );

    if (!confirmDelete) return;

    try {
      await deleteWorker(id);
      loadWorkers();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEdit = (worker) => {
    setSelectedWorker(worker);
    setShowForm(true);
  };

  const handleAddWorker = () => {
    setSelectedWorker(null);
    setShowForm(true);
  };

  const filteredWorkers = useMemo(() => {
    const keyword = search.toLowerCase();

    return workers.filter((worker) =>
      [
        worker.full_name,
        worker.phone,
        worker.email,
        worker.role,
        worker.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [workers, search]);

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Workers...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Workers
        </h1>

        <button
          onClick={handleAddWorker}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Worker
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-5">
        <input
          type="text"
          placeholder="Search workers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <WorkerTable
        workers={filteredWorkers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <WorkerForm
          worker={selectedWorker}
          onClose={() => {
            setShowForm(false);
            setSelectedWorker(null);
          }}
          onSuccess={loadWorkers}
        />
      )}

    </div>
  );
}

export default WorkersPage;