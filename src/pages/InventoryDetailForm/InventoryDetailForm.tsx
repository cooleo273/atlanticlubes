import React, { useState } from "react";
import axios from "axios";
import "./index.css"

const InventoryDetailForm = () => {
  const [inventoryName, setInventoryName] = useState("");
  const [description, setDescription] = useState("");
  const [application, setApplication] = useState("");
  const [performance, setPerformance] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState<File | null>(null); // Update state type to File | null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("inventory_name", inventoryName);
    formData.append("description", description);
    formData.append("application", JSON.stringify(application.split(","))); // Convert to array
    formData.append("performance", JSON.stringify(performance.split(","))); // Convert to array
    formData.append("recommendations", recommendations);
    formData.append("properties", JSON.stringify(properties.split(","))); // Convert to array
    
    // Append the image only if it is not null
    if (image) {
      formData.append("photo", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/inventory", formData, {
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
    } catch (error) {
      console.error("There was an error adding the inventory item!", error);
      alert("Error adding inventory item!");
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
          placeholder="Applications (comma-separated)"
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
          placeholder="Recommendations"
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
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <button type="submit">Add Inventory Item</button>
      </form>
    </div>
 

  );
};

export default InventoryDetailForm;
