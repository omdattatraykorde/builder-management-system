import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function StatusBadge({ status }) {
  const colors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function PaymentTable({
  payments,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-5 py-4">
              Customer
            </th>

            <th className="text-left px-5 py-4">
              Project
            </th>

            <th className="text-left px-5 py-4">
              Amount
            </th>

            <th className="text-left px-5 py-4">
              Method
            </th>

            <th className="text-left px-5 py-4">
              Date
            </th>

            <th className="text-left px-5 py-4">
              Status
            </th>

            <th className="text-center px-5 py-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-8 text-gray-500"
              >
                No payments found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  {payment.customer?.name || payment.customer_id}
                </td>

                <td className="px-5 py-4">
                  {payment.project?.project_name || payment.project_id}
                </td>

                <td className="px-5 py-4 font-semibold">
                  ₹
                  {Number(payment.amount).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  {payment.payment_method}
                </td>

                <td className="px-5 py-4">
                  {payment.payment_date}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge
                    status={payment.status}
                  />
                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(payment)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(payment.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
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

export default PaymentTable;