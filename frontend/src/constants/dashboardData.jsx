import {
  FaBuilding,
  FaUsers,
  FaHardHat,
  FaRupeeSign,
} from "react-icons/fa";

export const overviewCards = [
  {
    id: 1,
    title: "Projects",
    value: "12",
    subtitle: "4 Active Projects",
    color: "bg-blue-500",
    icon: <FaBuilding />,
  },
  {
    id: 2,
    title: "Customers",
    value: "18",
    subtitle: "3 New Customers",
    color: "bg-green-500",
    icon: <FaUsers />,
  },
  {
    id: 3,
    title: "Workers",
    value: "43",
    subtitle: "38 Present Today",
    color: "bg-orange-500",
    icon: <FaHardHat />,
  },
  {
    id: 4,
    title: "Expenses",
    value: "₹3.25L",
    subtitle: "This Month",
    color: "bg-red-500",
    icon: <FaRupeeSign />,
  },
];