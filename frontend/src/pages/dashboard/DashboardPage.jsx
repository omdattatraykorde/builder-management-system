import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  FaUsers,
  FaHardHat,
  FaUserTie,
  FaBoxes,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import MonthlyExpenseChart from "../../components/dashboard/charts/MonthlyExpenseChart";

import {
  getDashboardStats,
  getMonthlyExpenses,
} from "../../services/dashboardService";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total_customers: 0,
    total_projects: 0,
    active_projects: 0,
    total_workers: 0,
    active_workers: 0,
    total_materials: 0,
    total_expenses: 0,
    total_payments: 0,
  });

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsData, expenseChartData] = await Promise.all([
        getDashboardStats(),
        getMonthlyExpenses(),
      ]);

      setStats(statsData);
      setMonthlyExpenses(expenseChartData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <PageHeader
        title="Dashboard"
        subtitle="Welcome to BuildTrack. Here's a quick overview of your construction business."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Customers"
          value={stats.total_customers}
          subtitle="Registered Customers"
          icon={<FaUsers />}
          color="bg-blue-600"
        />

        <StatCard
          title="Construction Sites"
          value={stats.total_projects}
          subtitle={`${stats.active_projects} Active Sites`}
          icon={<FaHardHat />}
          color="bg-green-600"
        />

        <StatCard
          title="Workers"
          value={stats.total_workers}
          subtitle={`${stats.active_workers} Active Workers`}
          icon={<FaUserTie />}
          color="bg-orange-500"
        />

        <StatCard
          title="Materials"
          value={stats.total_materials}
          subtitle="Inventory Items"
          icon={<FaBoxes />}
          color="bg-purple-600"
        />

        <StatCard
          title="Expenses"
          value={`₹ ${Number(stats.total_expenses || 0).toLocaleString(
            "en-IN"
          )}`}
          subtitle="Overall Expenses"
          icon={<FaMoneyBillWave />}
          color="bg-red-600"
        />

        <StatCard
          title="Payments"
          value={`₹ ${Number(stats.total_payments || 0).toLocaleString(
            "en-IN"
          )}`}
          subtitle="Customer Payments"
          icon={<FaWallet />}
          color="bg-emerald-600"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <MonthlyExpenseChart
          data={monthlyExpenses}
        />

        <div className="bg-white rounded-2xl shadow-md p-6 h-96 flex flex-col justify-center items-center">

          <FaHardHat
            className="text-5xl text-blue-600 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            Site Analytics
          </h2>

          <p className="text-gray-500 mt-2 text-center">
            Advanced analytics and site performance charts
            will be added in the next phase.
          </p>

        </div>

      </div>

    </div>
  );
}