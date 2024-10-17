import React, { useState } from "react";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader"; // Import BounceLoader

const AddCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // State for loader

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const formData = new FormData();
    formData.append("name", categoryName);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "https://atlanticlubesbackend.vercel.app/api/category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Category added successfully!");
      setCategoryName("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding category!", error);
      alert("Error adding category!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Add Category</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "60%", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          style={{ height: "2.5rem", border: "none", borderBottom: "1px solid" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? (
            <BounceLoader color="#fff" size={24} />
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  height: "2.5rem",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default AddCategoryForm;
