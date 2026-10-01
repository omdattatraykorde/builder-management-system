import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import PageHeader from "../../components/common/PageHeader";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentForm from "../../components/payments/PaymentForm";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
  getPayments,
  deletePayment,
} from "../../services/paymentService";

function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedPayment(null);
    setShowForm(true);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setPaymentToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePayment(paymentToDelete);

      toast.success("Payment deleted");

      setShowDeleteDialog(false);
      setPaymentToDelete(null);

      loadPayments();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const filteredPayments = useMemo(() => {
    const keyword = search.toLowerCase();

    return payments.filter((payment) =>
      [
        payment.payment_method,
        payment.status,
        payment.transaction_id,
        payment.remarks,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [payments, search]);

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading Payments...
      </div>
    );
  }

  return (
    <div className="p-8">

      <PageHeader
        title="Payments"
        subtitle="Manage customer payments"
      />

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search payment..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-3 w-80"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Payment
        </button>

      </div>

      <PaymentTable
        payments={filteredPayments}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {showForm && (
        <PaymentForm
          payment={selectedPayment}
          onClose={() => {
            setShowForm(false);
            setSelectedPayment(null);
          }}
          onSuccess={loadPayments}
        />
      )}

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Payment"
        message="Are you sure you want to delete this payment?"
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setPaymentToDelete(null);
        }}
      />

    </div>
  );
}

export default PaymentsPage;