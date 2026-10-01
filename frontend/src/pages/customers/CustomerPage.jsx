import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import CustomerTable from "../../components/customers/CustomerTable";
import CustomerForm from "../../components/customers/CustomerForm";

import {
  getCustomers,
  deleteCustomer,
} from "../../services/customerService";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");

  // Load Customers
  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Delete Customer
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);

      toast.success("Customer deleted successfully");

      loadCustomers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer");
    }
  };

  // Edit Customer
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  // Add Customer
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowForm(true);
  };

  // Search Filter
  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase();

    return customers.filter((customer) =>
      [
        customer.name,
        customer.phone,
        customer.email,
        customer.city,
        customer.state,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [customers, search]);

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Customers...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <button
          onClick={handleAddCustomer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Customer
        </button>

      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-5">

        <input
          type="text"
          placeholder="Search by name, phone, email, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <CustomerTable
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <CustomerForm
          customer={selectedCustomer}
          onClose={() => {
            setShowForm(false);
            setSelectedCustomer(null);
          }}
          onSuccess={loadCustomers}
        />
      )}

    </div>
  );
}

export default CustomerPage;