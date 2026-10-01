import React from "react";

function CustomerTable({ customers, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-left">City</th>
            <th className="px-4 py-3 text-left">State</th>
            <th className="px-4 py-3 text-left">Pincode</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="text-center py-6 text-gray-500"
              >
                No Customers Found
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{customer.id}</td>

                <td className="px-4 py-3 font-medium">
                  {customer.name}
                </td>

                <td className="px-4 py-3">
                  {customer.phone}
                </td>

                <td className="px-4 py-3">
                  {customer.email}
                </td>

                <td className="px-4 py-3">
                  {customer.address}
                </td>

                <td className="px-4 py-3">
                  {customer.city}
                </td>

                <td className="px-4 py-3">
                  {customer.state}
                </td>

                <td className="px-4 py-3">
                  {customer.pincode}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(customer)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(customer.id)}
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

export default CustomerTable;