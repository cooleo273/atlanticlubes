import React, { useState, useEffect } from "react";
import ImageSlider from "../../components/imageslider/ImageSlider";
import BodyContainer from "../../components/BodyContainer/Body";
import img from "../../assets/20201102_153322-removebg-preview-2.png";
import img1 from "../../assets/whatsapp-image-2023-03-31-at-10.51.07.jpeg";
import img2 from "../../assets/ImageSlider/4th-01.jpg";
import HorizontalImageSlider from "../../components/imageslider/slidingGallery";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigUpIcon, MessageCircleIcon } from "lucide-react"; // Import WhatsApp-like icon
import person from "../../assets/capture.png"

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(true);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false)
  const [showCallbackPopup, setShowCallbackPopup] = useState(false);
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

  useEffect(() => {
    // Resetting state when the component mounts
    setShowScrollTop(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function with smoother animation
  // Scroll to top function using native smooth scrolling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCallbackPopup = () => {
    setShowCallbackPopup(!showCallbackPopup);
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
          title="About Us"
          description="SCHMIERÖL offers a wide variety of products and services, ranging from
          supply, manufacturing, and distribution for the entire lubricants
          industry spectrum. We are dedicated to providing comprehensive
          solutions to meet the specific needs of our clients across various
          industries, ensuring quality, efficiency, and environmental
          stewardship in every product."
          title2="What is lubrication, and why is it important?"
          description2="Lubrication can be defined as the application of oily or greasy
          substances, also called ‘lubricants’, to reduce friction and allow
          moving machine parts to slide smoothly past each other. It is a
          critical component in the functioning of machines, vehicles, and
          industrial equipment, as it not only reduces wear and tear but also
          aids in heat dissipation, corrosion prevention, and energy efficiency."
          title3="Why Our Products?"
          description3="  SCHMIERÖL products are blended with the highest quality of base oil
          and OEM-approved additive packages. Our products are certified by
          different world-renowned organizations, like the American Petroleum
          Institute (API), which guarantees that we meet strict industry
          standards. With a strong focus on research and development, we ensure
          that our products deliver exceptional performance under various
          conditions, providing peace of mind and extending the lifespan of your
          equipment."
          reverse={true}
          buttonText="Our Story"
          onButtonClick={() => navigate("/about")}
        />
      </div>

      <div className="py-2 bg-white rounded-lg mx-4 md:mx-8 lg:mx-16 transition-shadow duration-300">
        <BodyContainer
          image={img1}
          title="Products"
          description="SCHMIERÖL  specializes in producing premium-quality automotive, industrial, and marine lubricants, additives, antifreeze, brake fluid and car care products. Our comprehensive product range includes engine oils, transmission fluids, brake fluids, and industrial oils. We are dedicated to creating innovative solutions that meet the demands of modern engines and machinery, ensuring optimal performance and protection for our clients' assets under diverse operating conditions."
          buttonText="Explore Our Products"
          buttonVariant="white"
          onButtonClick={() => navigate("/products")}
        />
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
            We follow a rule of one distributor per country. Hurry up and become one of our international distributors.
            </p>
          </div>
          <button
            className="bg-transparent text-white font-semibold py-2 px-6 sm:px-12 rounded-lg border-2 border-white hover:bg-white hover:text-black hover:border-gray-500 transition h-12 sm:h-16 md:h-24"
            onClick={toggleCallbackPopup}
          >
            Request a Callback
          </button>
        </div>
      </div>

      {/* Callback Popup */}
      {showCallbackPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Request a Callback</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter your country"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="button"
                className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
              >
                Request
              </button>
            </form>
            <button
              className="absolute top-2 right-2 text-white hover:text-white bg-black hover:bg-black"
              onClick={toggleCallbackPopup}
            >
              ✖
            </button>
          </div>
        </div>
      )}


      {/* Horizontal Image Slider */}
      <HorizontalImageSlider />

      {/* Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 lg:px-16 py-12">
        <div className="bg-white rounded-lg p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            OEM and API Approvals
          </h3>
          <p className="text-md text-gray-600 mb-4">
            At SCHMIERÖL, we are proud to be approved by the American Petroleum
            Institute (API), a testament to the quality and performance of our
            products. Additionally, we have secured approvals from leading
            automobile manufacturers, reinforcing the reliability and excellence
            of our lubricants. Our API-certified and OEM-approved products meet
            the rigorous standards set by top brands, ensuring optimal
            compatibility and performance across a wide range of makes and
            models.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Exceptional Quality Standards
          </h3>
          <p className="text-md text-gray-600 mb-4">
            For SCHMIERÖL, maintaining the highest quality standards is central
            to everything we do. Each batch of our lubricants undergoes
            stringent testing in our state-of-the-art laboratories to ensure
            consistency, reliability, and safety. With API certification and a
            commitment to excellence, our products not only meet but exceed
            industry benchmarks at every stage of production—from raw materials
            to final packaging. This dedication to quality is what sets us apart
            and ensures customer satisfaction.
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
          <ArrowBigUpIcon size={24} />
        </button>
      )}

      {/* WhatsApp Button */}
<div
className="fixed bottom-5 right-5 z-50 cursor-pointer"
onClick={() => setShowWhatsAppPopup((prev) => !prev)}
>
<div className="p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition">
  <MessageCircleIcon color="white" size={24} />
</div>
</div>

{/* WhatsApp Popup */}
{showWhatsAppPopup && (
<div className="fixed bottom-20 right-5 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-300 w-72">
  <div className="flex items-center">
    <img
      src={person} // Replace with the image of the person
      alt="Person"
      className="w-16 h-16 rounded-full mr-4"
    />
    <div>
      <h3 className="text-lg font-bold">John Doe</h3>
      <h5 className="text-sm text-gray-600 font-bold">Customer Support</h5>
      <p className="text-sm text-gray-600">+491788854076</p>
    </div>
  </div>
  <button
    className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
    onClick={openWhatsApp}
  >
    Chat on WhatsApp
  </button>
</div>
)}
    </div>
  );
};

export default Home;
