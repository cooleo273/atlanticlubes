// src/pages/AddCategoryForm/AddCategoryForm.tsx
import React, { useState } from "react";
import axios from "axios";

const AddCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the uploaded image file

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);

    // Append the image file if it exists
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post("https://atlanticlubesbackend.vercel.app/api/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      });
      console.log(response.data);
      alert("Category added successfully!");
      setCategoryName(""); // Reset the input field
      setImageFile(null); // Reset the image file
    } catch (error) {
      console.error("Error adding category!", error);
      alert("Error adding category!");
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"60%", gap:"1rem"}}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          style={{height:"2.5rem", border:"none", borderBottom:"1px solid"}}
        />
        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]); // Set the uploaded image file
            }
          }}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
