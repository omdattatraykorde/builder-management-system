import DashboardCard from "./DashboardCard";
import { overviewCards } from "../../constants/dashboardData.jsx";

export default function OverviewCards() {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >
      {overviewCards.map((card) => (
        <DashboardCard
          key={card.id}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          color={card.color}
          icon={card.icon}
        />
      ))}
    </div>
  );
}