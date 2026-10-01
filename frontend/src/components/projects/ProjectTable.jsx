import { useNavigate } from "react-router-dom";

function ProjectTable({ projects, onEdit, onDelete }) {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md border border-gray-200">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="px-5 py-3 text-left">ID</th>
              <th className="px-5 py-3 text-left">Site Name</th>
              <th className="px-5 py-3 text-left">Location</th>
              <th className="px-5 py-3 text-left">Budget</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Start Date</th>
              <th className="px-5 py-3 text-left">End Date</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {projects.length === 0 ? (
              <tr>

                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No construction sites found.
                </td>

              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 whitespace-nowrap">
                    #{project.id}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {project.project_name}
                  </td>

                  <td className="px-5 py-4">
                    {project.location}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    ₹ {Number(project.budget || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>

                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    {project.start_date || "-"}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    {project.end_date || "-"}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2 flex-wrap">

                      <button
                        onClick={() =>
                          navigate(`/dashboard/sites/${project.id}`)
                        }
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                      >
                        Open Site
                      </button>

                      <button
                        onClick={() => onEdit(project)}
                        className="rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(project.id)}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
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

    </div>
  );
}

export default ProjectTable;