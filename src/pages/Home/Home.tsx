import React, { useState, useEffect } from "react";
import ImageSlider from "../../components/imageslider/ImageSlider";
import BodyContainer from "../../components/BodyContainer/Body";
import img from "../../assets/20201102_153322-removebg-preview-2.png";
import img1 from "../../assets/whatsapp-image-2023-03-31-at-10.51.07.jpeg";
import img2 from "../../assets/ImageSlider/4th-01.jpg";
import HorizontalImageSlider from "../../components/imageslider/slidingGallery";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigUpIcon, MessageCircleIcon } from "lucide-react"; // Import WhatsApp-like icon


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { id } = useParams<{ id: string }>();

  // Toggle scroll-to-top button visibility based on scroll position
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (id) {
          const response = await fetch(
            `https://atlanticlubesbackend.vercel.app/api/inventory?categoryId=${id}`
          );
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          localStorage.setItem("inventory", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [id]);
  
  // Scroll to top function with smoother animation
  // Scroll to top function using native smooth scrolling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // WhatsApp Click Handler
  const openWhatsApp = () => {
    // Replace with your WhatsApp number
    window.open(
      `https://api.whatsapp.com/send/?phone=491788854076&text&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  return (
    <div className="bg-white flex flex-col gap-10 relative">
      {/* Image Slider */}
      <ImageSlider />

      {/* Body Containers */}
      <div className="py-2 bg-white rounded-lg mx-4 md:mx-8 lg:mx-16 transition-shadow duration-300">
        <BodyContainer
          image={img}
          title="Pioneers of Lubricants and Grease Manufacturing"
          description="Atlantic Grease & Lubricants is one of the leading manufacturers in the automotive industry, dedicated to providing the highest quality products that meet global standards. Our manufacturing processes are powered by state-of-the-art technologies, and we are constantly innovating to bring the most efficient and effective products to the market. We are committed to serving our clients with solutions that extend the life of their machinery and vehicles while maintaining high standards of environmental care."
          reverse={true}
          buttonText="Our Story"
          onButtonClick={() => navigate("/about")}
        />
      </div>

      <div className="py-2 bg-white rounded-lg mx-4 md:mx-8 lg:mx-16 transition-shadow duration-300">
        <BodyContainer
          image={img1}
          title="Products"
          description="Atlantic Grease and Lubricants produces high-quality products ranging from automotive, industrial, marine lubricants, and car care products. Our extensive product line includes engine oils, transmission fluids, brake fluids, and industrial oils. We work tirelessly to develop solutions that keep up with the demands of modern machinery and engines, ensuring that our clients' assets are protected and perform optimally under various conditions."
          buttonText="Explore Our Products"
          buttonVariant="white"
          onButtonClick={() => navigate("/products")}
        />
      </div>

      {/* About Us Section */}
      <div
        id="about"
        className="py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-10 lg:py-12 lg:px-20 bg-white rounded-lg mx-2 sm:mx-4 md:mx-8 lg:mx-16 transition-shadow duration-300"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-md text-gray-600 mb-6">
          SCHMIERÖL offers a wide variety of products and services, ranging from
          supply, manufacturing, and distribution for the entire lubricants
          industry spectrum. We are dedicated to providing comprehensive
          solutions to meet the specific needs of our clients across various
          industries, ensuring quality, efficiency, and environmental
          stewardship in every product.
        </p>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          What is lubrication, and why is it important?
        </h3>
        <p className="text-md text-gray-600 mb-4">
          Lubrication can be defined as the application of oily or greasy
          substances, also called ‘lubricants’, to reduce friction and allow
          moving machine parts to slide smoothly past each other. It is a
          critical component in the functioning of machines, vehicles, and
          industrial equipment, as it not only reduces wear and tear but also
          aids in heat dissipation, corrosion prevention, and energy efficiency.
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">
          Why Our Products?
        </h3>
        <p className="text-md text-gray-700 mb-8">
          SCHMIERÖL products are blended with the highest quality of base oil
          and OEM-approved additive packages. Our products are certified by
          different world-renowned organizations, like the American Petroleum
          Institute (API), which guarantees that we meet strict industry
          standards. With a strong focus on research and development, we ensure
          that our products deliver exceptional performance under various
          conditions, providing peace of mind and extending the lifespan of your
          equipment.
        </p>
      </div>

      {/* Distributor Section */}
      <div
        className="relative flex items-center justify-center h-[400px] text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${img2})` }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-around">
          <div className="flex flex-col items-center sm:items-start sm:w-1/2 text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              Become a Distributor
            </h1>
            <p className="text-sm sm:text-md mb-3">
              We follow a rule of one distributor per country, ensuring
              exclusive rights and support for our partners. By becoming a
              SCHMIERÖL distributor, you join a global network that is committed
              to excellence and quality.
            </p>
          </div>
          <button
            className="bg-transparent text-white font-semibold py-2 px-6 sm:px-12 rounded-lg border-2 border-white hover:bg-white hover:text-black hover:border-gray-500 transition h-12 sm:h-16 md:h-24"
            onClick={() => alert("Callback requested!")}
          >
            Request a Callback
          </button>
        </div>
      </div>

      {/* Horizontal Image Slider */}
      <HorizontalImageSlider />

      {/* Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 lg:px-16 py-12">
        <div className="bg-white rounded-lg p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            OEM Approvals
          </h3>
          <p className="text-md text-gray-600 mb-4">
            At Atlantic Grease and Lubricants, we have secured approvals from
            leading automobile manufacturers, attesting to the quality and
            reliability of our products. Our OEM-approved lubricants meet the
            exacting standards required by top brands, ensuring compatibility
            and peak performance across various makes and models.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Maintain Stringent Quality Standards
          </h3>
          <p className="text-md text-gray-600 mb-4">
            Achieving premium quality standards is at the core of our
            operations. Each batch of lubricant is subjected to rigorous testing
            in our labs to ensure consistency, reliability, and safety. Our
            commitment to quality is reflected in every product, and we strive
            to meet and exceed industry benchmarks in all aspects of production,
            from raw materials to final packaging.
          </p>
          <button
            className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 hover:text-black transition"
            onClick={() => navigate("/certificates")}
          >
            Certification & Approvals
          </button>
        </div>
      </div>

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