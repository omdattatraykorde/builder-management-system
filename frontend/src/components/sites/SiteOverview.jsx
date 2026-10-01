function SiteOverview({ site }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Planning":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          Site Information
        </h2>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Site Name
            </p>
            <p className="font-semibold text-lg">
              {site.project_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Customer ID
            </p>
            <p className="font-medium">
              #{site.customer_id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Site Location
            </p>
            <p className="font-medium">
              {site.location || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Estimated Budget
            </p>
            <p className="text-2xl font-bold text-green-600">
              ₹ {Number(site.budget || 0).toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Current Status
            </p>

            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                site.status
              )}`}
            >
              {site.status}
            </span>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          Site Details
        </h2>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Start Date
            </p>
            <p className="font-medium">
              {site.start_date || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Expected Completion
            </p>
            <p className="font-medium">
              {site.end_date || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Description
            </p>
            <p className="font-medium leading-7">
              {site.description || "No description available."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SiteOverview;