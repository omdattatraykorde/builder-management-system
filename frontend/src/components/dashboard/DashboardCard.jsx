export default function DashboardCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      p-6
      border
      border-gray-100
      flex
      justify-between
      items-center
      "
    >
      {/* Left Side */}

      <div>
        <p className="text-gray-500 text-sm font-medium">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          {subtitle}
        </p>
      </div>

      {/* Right Side */}

      <div
        className={`
          ${color}
          h-16
          w-16
          rounded-xl
          flex
          items-center
          justify-center
          text-white
          text-2xl
        `}
      >
        {icon}
      </div>
    </div>
  );
}