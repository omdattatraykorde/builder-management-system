import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  createMaterial,
  updateMaterial,
} from "../../services/materialService";

import materialCategories from "../../constants/materialCategories";
import materialUnits from "../../constants/materialUnits";

function MaterialForm({
  material,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    material_name: "",
    category: "",
    unit: "",
    quantity: "",
    unit_price: "",
    supplier: "",
    status: "Available",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (material) {
      setFormData({
        material_name: material.material_name || "",
        category: material.category || "",
        unit: material.unit || "",
        quantity: material.quantity || "",
        unit_price: material.unit_price || "",
        supplier: material.supplier || "",
        status: material.status || "Available",
      });
    }
  }, [material]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.material_name.trim()) {
      toast.error("Material name is required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity || 0),
        unit_price: Number(formData.unit_price || 0),
      };

      if (material) {
        await updateMaterial(material.id, payload);
        toast.success("Material updated successfully");
      } else {
        await createMaterial(payload);
        toast.success("Material added successfully");
      }

      await onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          {material ? "Edit Material" : "Add Material"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="material_name"
            placeholder="Material Name"
            value={formData.material_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Category</option>

              {materialCategories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Unit</option>

              {materialUnits.map((unit) => (
                <option
                  key={unit}
                  value={unit}
                >
                  {unit}
                </option>
              ))}
            </select>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="unit_price"
              placeholder="Unit Price"
              value={formData.unit_price}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

          </div>

          <input
            type="text"
            name="supplier"
            placeholder="Supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : material ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default MaterialForm;