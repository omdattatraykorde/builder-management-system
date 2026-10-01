import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { getProject } from "../../services/projectService";
import {
  getDailyProgress,
  createDailyProgress,
} from "../../services/dailyProgressService";

import SiteSummaryCards from "../../components/sites/SiteSummaryCards";
import SiteOverview from "../../components/sites/SiteOverview";
import SiteTabs from "../../components/sites/SiteTabs";
import AssignedWorkersSection from "../../components/sites/AssignedWorkersSection";
import AttendanceSection from "../../components/sites/AttendanceSection";
import DailyProgressList from "../../components/sites/DailyProgressList";
import DailyProgressForm from "../../components/sites/DailyProgressForm";
import SitePhotosSection from "../../components/sites/SitePhotosSection";

export default function SiteWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [site, setSite] = useState(null);
  const [progressList, setProgressList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showProgressForm, setShowProgressForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getProject(id);
      setSite(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load site.");
    }

    try {
      const progress = await getDailyProgress(id);
      setProgressList(progress);
    } catch (error) {
      console.error(error);
      setProgressList([]);
    }

    setLoading(false);
  };

  const handleSaveProgress = async (data) => {
    try {
      await createDailyProgress(data);
      setShowProgressForm(false);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to save progress.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">
        Loading Site...
      </div>
    );
  }

  if (!site) {
    return (
      <div className="p-10 text-xl font-semibold text-red-600">
        Site not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <button
        onClick={() => navigate("/dashboard/projects")}
        className="flex items-center gap-2 mb-5 text-blue-600 hover:text-blue-700 font-medium"
      >
        <FaArrowLeft />
        Back to Sites
      </button>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              {site.project_name}
            </h1>

            <p className="text-gray-500 mt-1">
              📍 {site.location}
            </p>
          </div>

          <span
            className={`px-5 py-2 rounded-full font-semibold ${
              site.status === "Completed"
                ? "bg-green-100 text-green-700"
                : site.status === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {site.status}
          </span>

        </div>

      </div>

      <SiteSummaryCards site={site} />

      <SiteTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Overview" && (
        <SiteOverview site={site} />
      )}

      {activeTab === "Workers" && (
        <AssignedWorkersSection projectId={id} />
      )}

      {activeTab === "Attendance" && (
        <AttendanceSection projectId={id} />
      )}

      {activeTab === "Progress" && (
        <>
          <DailyProgressList
            progressList={progressList}
            onAdd={() => setShowProgressForm(true)}
            onEdit={() => {}}
            onDelete={() => {}}
          />

          {showProgressForm && (
            <DailyProgressForm
              projectId={id}
              onClose={() => setShowProgressForm(false)}
              onSave={handleSaveProgress}
            />
          )}
        </>
      )}

      {activeTab === "Photos" && (
        <SitePhotosSection projectId={id} />
      )}

      {activeTab === "Materials" && (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
          Materials Module Coming Soon
        </div>
      )}

      {activeTab === "Expenses" && (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
          Expenses Module Coming Soon
        </div>
      )}

      {activeTab === "Payments" && (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
          Payments Module Coming Soon
        </div>
      )}

    </div>
  );
}