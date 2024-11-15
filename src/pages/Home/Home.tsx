import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageslider/ImageSlider";
import BodyContainer from "../../components/BodyContainer/Body";
import img from "../../assets/20201102_153322-removebg-preview-2.png";
import img1 from "../../assets/whatsapp-image-2023-03-31-at-10.51.07.jpeg";
import img2 from "../../assets/4th-01.jpg";
import HorizontalImageSlider from "../../components/imageslider/slidingGallery";
import { ArrowBigUpIcon, MessageCircleIcon } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [inventoryData, setInventoryData] = useState<any[]>([]);

  // Fetch data and set it in state and localStorage
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://atlanticlubesbackend.vercel.app/api/category`
        );
        if (!response.ok) throw new Error("Failed to fetch inventory data");

        const data = await response.json();
        setInventoryData(data); // Store data in state for rendering
        localStorage.setItem("inventory", JSON.stringify(data)); // Store data in localStorage
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchItems(); // Fetch data on component mount

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=491788854076&text&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  return (
    <div className="bg-white flex flex-col gap-10 relative">
      {/* Image Slider */}
      <ImageSlider />

      {/* Render Inventory Data */}
      {inventoryData.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
          <ul>
            {inventoryData.map((item) => (
              <li key={item.id} className="text-gray-600">
                {item.name} - {item.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Body Containers */}
      <div className="py-2 bg-white rounded-lg mx-4 md:mx-8 lg:mx-16 transition-shadow duration-300">
        <BodyContainer
          image={img}
          title="Pioneers of Lubricants and Grease Manufacturing"
          description="Atlantic Grease & Lubricants is one of the leading manufacturers..."
          reverse={true}
          buttonText="Our Story"
          onButtonClick={() => navigate("/about")}
        />
      </div>

      {/* Other Components */}
      <HorizontalImageSlider />

      {/* Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowBigUpIcon size={30} />
        </button>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircleIcon size={30} />
      </button>
    </div>
  );
};

export default Home;
