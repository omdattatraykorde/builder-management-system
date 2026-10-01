import { useEffect, useMemo, useState } from "react";

import ProjectTable from "../../components/projects/ProjectTable";
import ProjectForm from "../../components/projects/ProjectForm";

import {
  getProjects,
  deleteProject,
} from "../../services/projectService";

function ProjectsPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const data = await getProjects();
      setSites(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load construction sites.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSite = () => {
    setSelectedSite(null);
    setShowForm(true);
  };

  const handleEdit = (site) => {
    setSelectedSite(site);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this site?"
    );

    if (!confirmed) return;

    try {
      await deleteProject(id);
      loadSites();
    } catch (error) {
      console.error(error);
      alert("Failed to delete site.");
    }
  };

  const filteredSites = useMemo(() => {
    const keyword = search.toLowerCase();

    return sites.filter((site) =>
      [
        site.project_name,
        site.location,
        site.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [sites, search]);

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Construction Sites...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Construction Sites
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all ongoing and completed construction sites.
          </p>

        </div>

        <button
          onClick={handleAddSite}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + New Site
        </button>

      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-5">

        <input
          type="text"
          placeholder="Search by site name, location or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <ProjectTable
        projects={filteredSites}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ProjectForm
          project={selectedSite}
          onClose={() => {
            setShowForm(false);
            setSelectedSite(null);
          }}
          onSuccess={loadSites}
        />
      )}

    </div>
  );
}

export default ProjectsPage;