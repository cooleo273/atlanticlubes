import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

const AddSlidingImageForm: React.FC = () => {

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // State for loader

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "https://shimerolbackend.vercel.app/api/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Image added successfully!");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding Image!", error);
      alert("Error adding Image!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop:"4rem" }}>
      <h1>Add Image</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "60%", gap: "2rem" }}
      >
        <input
          type="file"
          accept="image/*"
          style={{padding: "0rem"}}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? (
            <ClipLoader color="#fff" size={24} />
          ) : (
            "Add Image"
          )}
        </button>
      </form>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  height: "2.5rem",
  backgroundColor: "#3b3b98",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default AddSlidingImageForm;
