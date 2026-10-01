import { useEffect, useMemo, useState } from "react";

import MaterialTable from "../../components/materials/MaterialTable";
import MaterialForm from "../../components/materials/MaterialForm";

import {
  getMaterials,
  deleteMaterial,
} from "../../services/materialService";

function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [search, setSearch] = useState("");

  const loadMaterials = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMaterial(id);
      loadMaterials();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEdit = (material) => {
    setSelectedMaterial(material);
    setShowForm(true);
  };

  const handleAddMaterial = () => {
    setSelectedMaterial(null);
    setShowForm(true);
  };

  const filteredMaterials = useMemo(() => {
    const keyword = search.toLowerCase();

    return materials.filter((material) =>
      [
        material.material_name,
        material.category,
        material.supplier,
        material.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [materials, search]);

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Materials...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Materials
        </h1>

        <button
          onClick={handleAddMaterial}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Material
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-5">
        <input
          type="text"
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <MaterialTable
        materials={filteredMaterials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <MaterialForm
          material={selectedMaterial}
          onClose={() => {
            setShowForm(false);
            setSelectedMaterial(null);
          }}
          onSuccess={loadMaterials}
        />
      )}

    </div>
  );
}

export default MaterialsPage;