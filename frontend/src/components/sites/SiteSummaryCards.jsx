import {
  FaRupeeSign,
  FaMoneyBillWave,
  FaUsers,
  FaHardHat,
} from "react-icons/fa";

function SiteSummaryCards({ site }) {
  const cards = [
    {
      title: "Estimated Budget",
      value: `₹ ${Number(site.budget || 0).toLocaleString("en-IN")}`,
      subtitle: "Project Budget",
      icon: <FaRupeeSign />,
      color: "bg-green-600",
    },
    {
      title: "Total Expenses",
      value: "₹ 0",
      subtitle: "Coming Soon",
      icon: <FaMoneyBillWave />,
      color: "bg-red-600",
    },
    {
      title: "Assigned Workers",
      value: "0",
      subtitle: "Coming Soon",
      icon: <FaUsers />,
      color: "bg-orange-500",
    },
    {
      title: "Current Status",
      value: site.status,
      subtitle: "Construction Progress",
      icon: <FaHardHat />,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
        >
          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="text-2xl font-bold mt-2 text-gray-800">
                {card.value}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                {card.subtitle}
              </p>

            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl shadow-md`}
            >
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default SiteSummaryCards;