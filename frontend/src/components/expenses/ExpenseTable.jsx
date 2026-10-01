function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Payment</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-6 text-gray-500"
              >
                No Expenses Found
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  {expense.id}
                </td>

                <td className="px-4 py-3 font-medium">
                  {expense.expense_title}
                </td>

                <td className="px-4 py-3">
                  {expense.category}
                </td>

                <td className="px-4 py-3">
                  ₹ {Number(expense.amount).toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-3">
                  {expense.payment_method}
                </td>

                <td className="px-4 py-3">
                  {expense.expense_date}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(expense)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(expense.id)}
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

export default ExpenseTable;