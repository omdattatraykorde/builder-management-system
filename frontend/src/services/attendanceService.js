import api from "./api";

// Get attendance by project
export const getAttendance = async (projectId) => {
  const response = await api.get(
    `/attendance/project/${projectId}`
  );

  return response.data;
};

// Save attendance
export const saveAttendance = async (attendance) => {
  const response = await api.post(
    "/attendance/",
    attendance
  );

  return response.data;
};

// Delete attendance
export const deleteAttendance = async (attendanceId) => {
  const response = await api.delete(
    `/attendance/${attendanceId}`
  );

  return response.data;
};

// Attendance Summary
export const getAttendanceSummary = async (
  projectId,
  month
) => {
  const attendance = await getAttendance(projectId);

  return attendance.filter((item) =>
    item.attendance_date.startsWith(month)
  );
};