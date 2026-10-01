import {
  FaHome,
  FaUsers,
  FaHardHat,
  FaBoxes,
  FaMoneyBillWave,
  FaWallet,
  FaChartBar,
  FaUser,
  FaCog,
} from "react-icons/fa";

const sidebarMenu = [
  {
    section: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: FaHome,
      },
    ],
  },

  {
    section: "MANAGEMENT",
    items: [
      {
        name: "Customers",
        path: "/dashboard/customers",
        icon: FaUsers,
      },
      {
        name: "Sites",
        path: "/dashboard/projects",
        icon: FaHardHat,
      },
      {
        name: "Workers",
        path: "/dashboard/workers",
        icon: FaUsers,
      },
      {
        name: "Materials",
        path: "/dashboard/materials",
        icon: FaBoxes,
      },
    ],
  },

  {
    section: "FINANCE",
    items: [
      {
        name: "Expenses",
        path: "/dashboard/expenses",
        icon: FaMoneyBillWave,
      },
      {
        name: "Payments",
        path: "/dashboard/payments",
        icon: FaWallet,
      },
    ],
  },

  {
    section: "REPORTS",
    items: [
      {
        name: "Reports",
        path: "/dashboard/reports",
        icon: FaChartBar,
      },
    ],
  },

  {
    section: "ACCOUNT",
    items: [
      {
        name: "My Profile",
        path: "/dashboard/profile",
        icon: FaUser,
      },
    ],
  },

  {
    section: "SETTINGS",
    items: [
      {
        name: "Settings",
        path: "/dashboard/settings",
        icon: FaCog,
      },
    ],
  },
];

export default sidebarMenu;