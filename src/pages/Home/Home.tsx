import React from "react";
import ImageSlider from "../../components/imageslider/ImageSlider"; // Adjust the path as necessary
import "./index.css";
import BodyContainer from "../../components/BodyContainer/Body";
import img from "../../assets/Atlantic-Lubes-Production-line.webp";
import HorizontalImageSlider from "../../components/imageslider/slidingGallery";

const Home: React.FC = () => {
  return (
    <div>
      <ImageSlider />
      <BodyContainer
        image={img}
        title="Pioneers of Lubricants and Grease Manufacturing"
        description="Atlantic Grease & Lubricants is one of the leading manufacturers in the automotive industry providing high-performance products certified by renowned European and American automobile
        industries.
        AGL incorporates cutting-edge expertise with certified lubricants and greases for customers
        globally. Our consistent dedication to innovation, excellence, and customer satisfaction, we have
        established a trusted name in the lubricants Industry. In addition to our extensive product range,
        we offer bespoke lubricant manufacturing solutions to third-party entities, tailored precisely to
        their unique requirements."
        reverse={true}
        buttonText="Our Story"
        onButtonClick={() => alert("Button clicked!")}
      />
      <BodyContainer
        image={img}
        title="Products"
        description="Atlantic Grease and Lubricants produces high-quality products ranging from automotive, industrial, 
        marine lubricants and car care products.
        
        To ensure that our products meet the highest standards, we process them in our state-of-the-art laboratory, 
        approved by our world-class professionals. We recognize the critical reliance our customers place on our products 
        to maintain seamless and efficient operation of their equipment. For this reason, we are committed to upholding the most 
        exceptional quality standard benchmarks in the industry, 
        offering a diverse solution to all your lubrication needs."
        buttonText="Explore Our Products"
        buttonVariant="white"
        onButtonClick={() => alert("Button clicked!")}
      />
      <HorizontalImageSlider/>
      <div className="body-container-wrapper">
    <BodyContainer
        title="OEM APPROVALS"
        description="At Atlantic Grease and Lubricants, we have secured approvals leading automobile manufacturers. 
        Thus, we demonstrate our commitment to delivering the best possible outcomes to our customers. 
        Recognizing the significance of quality to our valued customers, we uphold the utmost standards of excellence in all our endeavors."
    />
    <BodyContainer
        title="Maintain Stringent Quality Standards"
        description="Achieving premium quality standards sits at the core of Atlantic Grease & Lubricants operations.
         Ensuring the quality of our products we are committed to systematically testing and monitoring at every stage of production. 
         While manufacturing our products, we make use of cutting-edge technology and premium solutions to ensure the highest quality 
         standards at its maximum potential."
        buttonText="Certification & Approvals"
        buttonVariant="white"
        onButtonClick={() => alert("Button clicked!")}
    />
</div>

    </div>
  );
};

export default Home;
