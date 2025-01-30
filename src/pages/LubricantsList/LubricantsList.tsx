import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

interface Lubricant {
  id: number;
  inventory_name: string;
  description: string;
  application: string;
  performance: string;
  recommendations: string;
  categoryId?: number;
  image?: File | null;
  tds?: File | null;
  msds?: File | null;
}

const LubricantsList: React.FC = () => {
  const [lubricants, setLubricants] = useState<Lubricant[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Lubricant | null>(null);

  const fetchLubricants = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Lubricant[]>("https://shimerolbackend.vercel.app/api/inventory");
      setLubricants(response.data);
    } catch (error) {
      console.error("Error fetching lubricants", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLubricants();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`https://shimerolbackend.vercel.app/api/inventory/${id}`);
        alert("Inventory item deleted successfully!");
        fetchLubricants();
      } catch (error) {
        console.error("Error deleting inventory item", error);
        alert("Error deleting inventory item!");
      }
    }
  };

  const openEditModal = (item: Lubricant) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setEditModalOpen(false);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Lubricant) => {
    if (selectedItem && event.target.files) {
      setSelectedItem({ ...selectedItem, [field]: event.target.files[0] });
    }
  };


  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("inventory_name", selectedItem.inventory_name);
    formData.append("description", selectedItem.description);
    formData.append("application", selectedItem.application);

    const performance = Array.isArray(selectedItem.performance)
      ? selectedItem.performance
      : selectedItem.performance.split(",");
    const recommendations = Array.isArray(selectedItem.recommendations)
      ? selectedItem.recommendations
      : selectedItem.recommendations.split(",");

    formData.append("performance", JSON.stringify(performance));
    formData.append("recommendations", JSON.stringify(recommendations));

    if (selectedItem.categoryId) {
      formData.append("categoryId", selectedItem.categoryId.toString());
    }
    if (selectedItem.image) {
      formData.append("image", selectedItem.image);
    }
    if (selectedItem.tds) {
      formData.append("tds", selectedItem.tds);
    }
    if (selectedItem.msds) {
      formData.append("msds", selectedItem.msds);
    }

    try {
      await axios.put(
        `https://shimerolbackend.vercel.app/api/inventory/${selectedItem.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Inventory item updated successfully!");
      closeEditModal();
      fetchLubricants();
    } catch (error) {
      console.error("Error updating inventory item", error);
      alert("Error updating inventory item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-left ml-2 text-gray-800 mb-6">Lubricants List</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <ClipLoader color="#36D7B7" loading={loading} size={50} />
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          {lubricants.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.inventory_name}
              </h3>
            
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      
            <h2 className="text-2xl font-bold mb-4">Edit Inventory Item</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Inventory Name"
                value={selectedItem.inventory_name || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, inventory_name: e.target.value })
                }
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <textarea
                placeholder="Description"
                value={selectedItem.description || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <input
                type="text"
                placeholder="Applications"
                value={selectedItem.application || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, application: e.target.value })
                }
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <input
                type="text"
                placeholder="Performance (comma-separated)"
                value={selectedItem.performance || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, performance: e.target.value })
                }
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <input
                type="text"
                placeholder="Recommendations (comma-separated)"
                value={selectedItem.recommendations || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, recommendations: e.target.value })
                }
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <label className="block mb-2">Upload Image:</label>
              <input type="file" onChange={(e) => handleFileChange(e, "image")} className="mb-4" />

              <label className="block mb-2">Upload TDS:</label>
              <input type="file" onChange={(e) => handleFileChange(e, "tds")} className="mb-4" />

              <label className="block mb-2">Upload MSDS:</label>
              <input type="file" onChange={(e) => handleFileChange(e, "msds")} className="mb-4" />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LubricantsList;
