import {
  FaChartPie,
  FaUsers,
  FaClipboardCheck,
  FaTasks,
  FaCamera,
  FaBoxes,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

const tabs = [
  {
    label: "Overview",
    icon: <FaChartPie />,
  },
  {
    label: "Workers",
    icon: <FaUsers />,
  },
  {
    label: "Attendance",
    icon: <FaClipboardCheck />,
  },
  {
    label: "Progress",
    icon: <FaTasks />,
  },
  {
    label: "Photos",
    icon: <FaCamera />,
  },
  {
    label: "Materials",
    icon: <FaBoxes />,
  },
  {
    label: "Expenses",
    icon: <FaMoneyBillWave />,
  },
  {
    label: "Payments",
    icon: <FaWallet />,
  },
];

function SiteTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 mb-6">

      <div className="flex overflow-x-auto">

        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 whitespace-nowrap px-6 py-4 font-semibold border-b-4 transition-all duration-200 ${
              activeTab === tab.label
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <span className="text-base">
              {tab.icon}
            </span>

            <span>
              {tab.label}
            </span>
          </button>
        ))}

      </div>

    </div>
  );
}

export default SiteTabs;