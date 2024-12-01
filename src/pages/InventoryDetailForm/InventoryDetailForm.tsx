import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import "./index.css";

const InventoryDetailForm = () => {
  const [inventoryName, setInventoryName] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");
  const [performance, setPerformance] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tds, setTds] = useState<File | null>(null); // State for TDS file
  const [msds, setMsds] = useState<File | null>(null); // State for MSDS file
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://atlanticlubesbackend.vercel.app/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("inventory_name", inventoryName);
    formData.append("description", description);
    formData.append("application", application);
    formData.append("performance", JSON.stringify(performance.split(",")));
    formData.append("recommendations", JSON.stringify(recommendations.split(",")));
    formData.append("properties", JSON.stringify(properties.split(",")));

    if (selectedCategoryId) {
      formData.append("categoryId", selectedCategoryId.toString());
    }

    if (image) {
      formData.append("image", image);
    }
    if (tds) {
      formData.append("tds", tds);
    }
    if (msds) {
      formData.append("msds", msds);
    }

    try {
      const response = await axios.post("https://atlanticlubesbackend.vercel.app/api/inventory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Inventory item added successfully!");

      // Reset form fields
      setInventoryName("");
      setDescription("");
      setApplication("");
      setPerformance("");
      setRecommendations("");
      setProperties("");
      setImage(null);
      setTds(null);
      setMsds(null);
      setSelectedCategoryId(null);

      // Clear the file input fields
      const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
      fileInputs.forEach(input => input.value = "");

    } catch (error) {
      console.error("There was an error adding the inventory item!", error);
      alert("Error adding inventory item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-inventory-container">
      <h1>Add Inventory Item</h1>
      <form onSubmit={handleSubmit} className="add-inventory-form">
        <input
          type="text"
          placeholder="Inventory Name"
          value={inventoryName}
          onChange={(e) => setInventoryName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Applications"
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Performance (comma-separated)"
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Recommendations (comma-separated)"
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Properties (comma-separated)"
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
          required
        />
        <select
          style={formContainerStyle}
          value={selectedCategoryId || ""}
          onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          required
        >
          <option value="" disabled>Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setImage)}
          accept="image/*"
          required
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setTds)}
          accept="application/pdf"
          required
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setMsds)}
          accept="application/pdf"
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          className="bg-violet-600"
        >
          {loading ? <ClipLoader color="#36D7B7" loading={loading} size={30} /> : "Add Inventory Item"}
        </button>
      </form>
    </div>
  );
};

const formContainerStyle: React.CSSProperties = {
  padding: "1rem",
  width: "100%",
  marginBottom: "1rem",
  borderRadius: "0.5rem",
  border:"1px solid",
  borderColor: "#cccc",
};

export default InventoryDetailForm;
