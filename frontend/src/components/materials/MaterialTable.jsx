function MaterialTable({ materials, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Material</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Unit</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Unit Price</th>
            <th className="px-4 py-3 text-left">Supplier</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {materials.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="text-center py-6 text-gray-500"
              >
                No Materials Found
              </td>
            </tr>
          ) : (
            materials.map((material) => (
              <tr
                key={material.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{material.id}</td>

                <td className="px-4 py-3 font-medium">
                  {material.material_name}
                </td>

                <td className="px-4 py-3">
                  {material.category}
                </td>

                <td className="px-4 py-3">
                  {material.unit}
                </td>

                <td className="px-4 py-3">
                  {material.quantity}
                </td>

                <td className="px-4 py-3">
                  ₹ {material.unit_price}
                </td>

                <td className="px-4 py-3">
                  {material.supplier}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      material.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {material.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(material)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(material.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MaterialTable;