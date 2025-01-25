import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

interface Image {
  id: string;
  image: string; // Assuming the response contains image URLs
}

const SlidingImage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false); // State for loader
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null); // Store image ID to delete

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://atlanticlubesbackend.vercel.app/api/images");
        setImages(response.data); // Assuming the API response contains an array of images
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []);

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle submit for adding an image
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "https://atlanticlubesbackend.vercel.app/api/images",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      setImages((prevImages) => [...prevImages, response.data]); // Add new image to state
      setImageFile(null);
    } catch (error) {
      console.error("Error adding image", error);
      alert("Error adding image");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete image
  const handleDelete = async () => {
    if (selectedImageId) {
      try {
        await axios.delete(`https://atlanticlubesbackend.vercel.app/api/images/${selectedImageId}`);
        setImages((prevImages) => prevImages.filter((image) => image.id !== selectedImageId)); // Remove deleted image from state
        alert("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image", error);
        alert("Error deleting image");
      } finally {
        setShowDeleteModal(false); // Close modal after deletion
        setSelectedImageId(null); // Reset selected image ID
      }
    }
  };

  return (
    <div className="flex flex-col" style={{ textAlign: "left", padding: "2rem", backgroundColor: "#f4f6f9" , marginLeft:"2rem" }}>
      <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.5rem", marginBottom: "2rem", color: "#333", fontWeight: "bold" }}>
        Sliding Images
      </h1>

      {/* Image Slider Section */}
      <div className="grid grid-cols-4 gap-4 justify-center" style={{ gap: "1rem", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div
            key={image.id}
            className="image-container relative rounded-lg overflow-hidden shadow-lg transform transition-transform ease-in-out"
            style={{
              width: "300px", // Set fixed width
              height: "300px", // Set fixed height
            }}
          >
            <img
              src={image.image}
              alt="Sliding Image"
              className="w-full h-full object-cover"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
              }}
            />
            <button
              onClick={() => {
                setSelectedImageId(image.id);
                setShowDeleteModal(true); // Show the modal when the delete button is clicked
              }}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 cursor-pointer hover:bg-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h3>Are you sure you want to delete this image?</h3>
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-blue-500 text-white p-2 rounded-md ml-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidingImage;
