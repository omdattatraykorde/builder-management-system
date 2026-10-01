function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
  subtitle = "",
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div className="flex-1">

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-800 break-words">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm text-gray-400">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`${color} ml-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;