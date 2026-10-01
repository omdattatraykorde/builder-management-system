import { useEffect, useMemo, useState } from "react";

import { getAssignedWorkers } from "../../services/workerAssignmentService";
import { getWorkers } from "../../services/workerService";
import {
  getAttendance,
  saveAttendance,
} from "../../services/attendanceService";

function AttendanceSection({ projectId }) {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [workers, setWorkers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, [projectId, selectedDate]);

  const loadData = async () => {
    try {
      const [assigned, allWorkers, attendanceData] =
        await Promise.all([
          getAssignedWorkers(projectId),
          getWorkers(),
          getAttendance(projectId),
        ]);

      const assignedWorkers = assigned
        .map((item) =>
          allWorkers.find(
            (worker) =>
              Number(worker.id) === Number(item.worker_id)
          )
        )
        .filter(Boolean);

      setWorkers(assignedWorkers);

      const attendanceMap = {};

      assignedWorkers.forEach((worker) => {
        attendanceMap[worker.id] = "Present";
      });

      attendanceData
        .filter(
          (item) => item.attendance_date === selectedDate
        )
        .forEach((item) => {
          attendanceMap[item.worker_id] = item.status;
        });

      setAttendance(attendanceMap);

      const sorted = [...attendanceData].sort(
        (a, b) =>
          new Date(b.attendance_date) -
          new Date(a.attendance_date)
      );

      setAttendanceHistory(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  const groupedHistory = useMemo(() => {
    const groups = {};

    attendanceHistory.forEach((item) => {
      if (!groups[item.attendance_date]) {
        groups[item.attendance_date] = [];
      }

      groups[item.attendance_date].push(item);
    });

    return groups;
  }, [attendanceHistory]);

  const handleSave = async () => {
    try {
      for (const worker of workers) {
        await saveAttendance({
          project_id: Number(projectId),
          worker_id: worker.id,
          attendance_date: selectedDate,
          status: attendance[worker.id],
        });
      }

      alert("Attendance saved successfully.");

      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const getWorker = (id) =>
    workers.find((w) => w.id === id);

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Daily Attendance
            </h2>

            <p className="text-gray-500">
              Mark attendance of assigned workers
            </p>

          </div>

          <div className="flex gap-3">

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="border rounded-lg px-4 py-2"
            />

            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
            >
              Save Attendance
            </button>

          </div>

        </div>

        <div className="space-y-4">

          {workers.map((worker) => (

            <div
              key={worker.id}
              className="border rounded-xl p-5 flex justify-between items-center"
            >

              <div>

                <h3 className="text-lg font-bold">
                  {worker.full_name}
                </h3>

                <p className="text-gray-500">
                  {worker.role}
                </p>

              </div>

              <select
                value={attendance[worker.id]}
                onChange={(e) =>
                  setAttendance({
                    ...attendance,
                    [worker.id]: e.target.value,
                  })
                }
                className="border rounded-lg px-4 py-2"
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Half Day</option>
                <option>Leave</option>
              </select>

            </div>

          ))}

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          Attendance History
        </h2>

        {Object.keys(groupedHistory).length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No attendance found.
          </div>

        ) : (

          Object.entries(groupedHistory).map(
            ([date, records]) => (

              <div
                key={date}
                className="mb-8"
              >

                <h3 className="text-lg font-bold mb-3 border-b pb-2">
                  📅 {date}
                </h3>

                <table className="w-full">

                  <thead>

                    <tr className="bg-slate-100">

                      <th className="text-left p-3">
                        Worker
                      </th>

                      <th className="text-left p-3">
                        Role
                      </th>

                      <th className="text-center p-3">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {records.map((item) => {

                      const worker = getWorker(
                        item.worker_id
                      );

                      return (

                        <tr
                          key={item.id}
                          className="border-b"
                        >

                          <td className="p-3">
                            {worker?.full_name}
                          </td>

                          <td className="p-3">
                            {worker?.role}
                          </td>

                          <td className="p-3 text-center">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                item.status ===
                                "Present"
                                  ? "bg-green-100 text-green-700"
                                  : item.status ===
                                    "Absent"
                                  ? "bg-red-100 text-red-700"
                                  : item.status ===
                                    "Half Day"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {item.status}
                            </span>

                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default AttendanceSection;