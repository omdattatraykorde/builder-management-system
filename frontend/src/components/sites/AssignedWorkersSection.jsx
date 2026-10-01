import { useEffect, useState } from "react";

import {
  getAssignedWorkers,
  assignWorker,
  removeWorker,
} from "../../services/workerAssignmentService";

import { getWorkers } from "../../services/workerService";

import ConfirmDialog from "../common/ConfirmDialog";
import AssignWorkerModal from "./AssignWorkerModal";

function AssignedWorkersSection({ projectId }) {
  const [workers, setWorkers] = useState([]);
  const [assignedWorkers, setAssignedWorkers] = useState([]);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    try {
      const workersData = await getWorkers();
      const assignedData = await getAssignedWorkers(projectId);

      setWorkers(workersData);
      setAssignedWorkers(assignedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssign = async (workerId) => {
    try {
      await assignWorker({
        project_id: Number(projectId),
        worker_id: Number(workerId),
        assigned_date: new Date().toISOString().split("T")[0],
      });

      setShowAssignModal(false);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to assign worker.");
    }
  };

  const handleDeleteClick = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await removeWorker(selectedAssignment);

      setShowDeleteDialog(false);
      setSelectedAssignment(null);

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Assigned Workers
            </h2>

            <p className="text-gray-500 mt-1">
              Manage workers working on this site.
            </p>

          </div>

          <button
            onClick={() => setShowAssignModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            + Assign Worker
          </button>

        </div>

        {assignedWorkers.length === 0 ? (

          <div className="py-16 text-center text-gray-500">
            No workers assigned to this project.
          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-5">

            {assignedWorkers.map((assignment) => {

              const worker = workers.find(
                (w) => Number(w.id) === Number(assignment.worker_id)
              );

              return (
                <div
                  key={assignment.id}
                  className="border rounded-2xl p-5 hover:shadow-md transition"
                >

                  <div className="flex justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                          👷
                        </div>

                        <div>

                          <h3 className="text-lg font-bold">
                            {worker?.full_name}
                          </h3>

                          <p className="text-gray-500">
                            {worker?.role}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 space-y-2 text-sm">

                        <p>
                          📞 {worker?.phone}
                        </p>

                        <p>
                          ✉️ {worker?.email}
                        </p>

                        <p>
                          💰 ₹ {worker?.daily_wage}/day
                        </p>

                        <p>
                          📅 Assigned :
                          {" "}
                          {assignment.assigned_date}
                        </p>

                      </div>

                    </div>

                    <div>

                      <button
                        onClick={() =>
                          handleDeleteClick(assignment.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

      {showAssignModal && (
        <AssignWorkerModal
          workers={workers}
          assignedWorkers={assignedWorkers}
          onAssign={handleAssign}
          onClose={() => setShowAssignModal(false)}
        />
      )}

      <ConfirmDialog
        open={showDeleteDialog}
        title="Remove Worker"
        message="Remove this worker from this site?"
        confirmText="Remove"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedAssignment(null);
        }}
      />

    </>
  );
}

export default AssignedWorkersSection;