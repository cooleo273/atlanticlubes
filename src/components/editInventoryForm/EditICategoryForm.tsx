import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

const EditCategoryForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false); // Separate loading state for update
  const [deleteLoading, setDeleteLoading] = useState(false); // Separate loading state for delete

  // Fetch categories for editing
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://shimerolbackend.vercel.app/api/category"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSelect = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setSelectedCategory(category);
      setNewName(category.name);
      setNewImage(null);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;
    setUpdateLoading(true); // Start update loader

    const formData = new FormData();
    formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    try {
      await fetch(
        `https://shimerolbackend.vercel.app/api/category/${selectedCategory.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Update failed!", error);
      alert("Failed to update the category.");
    } finally {
      setUpdateLoading(false); // Stop update loader
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category: ${selectedCategory.name}?`
    );

    if (!confirmDelete) return;

    setDeleteLoading(true); // Start delete loader
    try {
      await axios.delete(
        `https://shimerolbackend.vercel.app/api/category/${selectedCategory.id}`
      );

      alert("Category deleted successfully!");
      setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
      setSelectedCategory(null);
      setNewName("");
    } catch (error: any) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the category.");
    } finally {
      setDeleteLoading(false); // Stop delete loader
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Edit Category</h2>
      <select style={selectStyle} onChange={(e) => handleSelect(Number(e.target.value))}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div style={{ marginTop: "1.5rem" }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Category Name"
            style={inputStyle}
          />

          <div style={{ marginTop: "1rem" }}>
            <label style={labelStyle}>Upload New Image:</label>
            <input type="file" style={fileInputStyle} onChange={handleImageChange} />
          </div>

          {selectedCategory.imageUrl && (
            <div style={{ marginTop: "1rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>Current Image:</p>
              <img
                src={selectedCategory.imageUrl}
                alt={selectedCategory.name}
                width="100"
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button
              style={updateButtonStyle}
              onClick={handleUpdate}
              disabled={updateLoading} // Disable update button while loading
            >
              {updateLoading ? <ClipLoader color="#fff" size={24} /> : "Update"}
            </button>
            <button
              onClick={handleDelete}
              style={deleteButtonStyle}
              disabled={deleteLoading} // Disable delete button while loading
            >
              {deleteLoading ? <ClipLoader color="#fff" size={24} /> : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styling for the main container
const formContainerStyle: React.CSSProperties = {
  padding: "2rem",
  margin: "0 auto",
  width: "75%",
};

// Styling for the select dropdown
const selectStyle: React.CSSProperties = {
  width:"100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

// Styling for the text input field
const inputStyle: React.CSSProperties = {
  width: "72%",
  padding: "0.8rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

// Styling for the label
const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "bold",
};

// Styling for the file input
const fileInputStyle: React.CSSProperties = {
  display: "block",
  width: "73%",
  padding: "0.5rem",
  marginTop: "0.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

// Styling for the update button
const updateButtonStyle: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "7rem",
  height: "2.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Styling for the delete button
const deleteButtonStyle: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "7rem",
  height: "2.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default EditCategoryForm;
