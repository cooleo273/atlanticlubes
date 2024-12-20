import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader
import "./index.css";

interface InventoryItem {
  id: string;
  inventory_name: string;
  description: string;
  application?: string;
  performance?: string[];
  recommendations?: string[];
  image?: string;
}

const LubricantsList: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    axios
      .get("https://atlanticlubesbackend.vercel.app/api/inventory")
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  const handleEditClick = (item: InventoryItem) => {
    setLoading(true); // Start loader
    setTimeout(() => {
      setEditingItem(item);
      setFormData({
        inventory_name: item.inventory_name,
        description: item.description,
        application: item.application,
        performance: item.performance || [],
        recommendations: item.recommendations || [],
        image: item.image,
      });
      setLoading(false); // Stop loader
    }, 1000); // Simulate a short delay
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof InventoryItem
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof InventoryItem
  ) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://atlanticlubesbackend.vercel.app/api/inventory/${id}`
      );
      alert("Item deleted successfully!");
      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  // Track update loading state

  const handleUpdate = async () => {
    if (editingItem) {
      setIsUpdating(true); // Start loader animation

      const formDataToSend = new FormData();
      formDataToSend.append("inventory_name", formData.inventory_name || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("application", formData.application || "");
      formDataToSend.append(
        "performance",
        JSON.stringify(formData.performance || [])
      );
      formDataToSend.append(
        "recommendations",
        JSON.stringify(formData.recommendations || [])
      );
      if (imageFile) formDataToSend.append("photo", imageFile);

      try {
        await axios.put(
          `https://atlanticlubesbackend.vercel.app/api/inventory/${editingItem.id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert("Item updated successfully!");
        setInventory((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...formData } : item
          )
        );
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        setIsUpdating(false); // Stop loader after operation
        setEditingItem(null);
        setImageFile(null);
      }
    }
  };

  return (
    <div className="inventory-list">
      <h1>Lubricants Inventory</h1>

      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            <h4>{item.inventory_name}</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <ClipLoader size={50} color="#007bff" />
        </div>
      ) : (
        editingItem && (
          <div className="edit-form">
            <h2>Edit Item</h2>
            <label>Inventory Name</label>
            <input
              type="text"
              value={formData.inventory_name || ""}
              onChange={(e) => handleInputChange(e, "inventory_name")}
              placeholder="Inventory Name"
            />
            <label>Description</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => handleInputChange(e, "description")}
              placeholder="Description"
            />
            <label>Application</label>
            <input
              type="text"
              value={formData.application || ""}
              onChange={(e) => handleArrayChange(e, "application")}
              placeholder="Applications (comma-separated)"
            />
            <label>Performance</label>
            <input
              type="text"
              value={(formData.performance || []).join(", ")}
              onChange={(e) => handleArrayChange(e, "performance")}
              placeholder="Performance (comma-separated)"
            />
            <label>Recommendation</label>
            <input
              value={(formData.recommendations || []).join(", ")}
              onChange={(e) => handleArrayChange(e, "recommendations")}
              placeholder="Recommendations"
            />
            <label>Images</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {isUpdating ? (
              <div className="loader">
                <ClipLoader color="#36d7b7" size={50} />
              </div>
            ) : (
              <button onClick={handleUpdate}>Update</button>
            )}

            <button onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        )
      )}
    </div>
  );
};

export default LubricantsList;
