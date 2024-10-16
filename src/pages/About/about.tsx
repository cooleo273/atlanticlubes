import React from "react";
import BodyContainer from "../../components/BodyContainer/Body";
import img from "../../assets/image-25.png";
import img1 from "../../assets/Sheikh-Naseem-CEO-Atlantic-Lubricant.webp";
import img2 from "../../assets/20201102_153322-removebg-preview-2.png";
import Card from "../../components/card/card";
import theme from "../../components/theme/theme";
import "./index.css"

const About: React.FC = () => {
  return (
    <div className="slider-container">
      <img
        src={img}
        alt="about"
        style={{ height: "45rem", width: "100%", objectFit: "cover" }}
      />
      <BodyContainer
        image={img2}
        title="About Us"
        description="Atlantic Grease & Lubricants (AGL) is part of the Atlantic group of companies registered at Hamriyah Free Zone, Sharjah, UAE, with a rich history spanning over seven decades. We have been dedicated to continuous research and growth to achieve customer satisfaction and high quality standards.

            At Atlantic Grease and Lubricants, we are committed to constant development, with a strong
            emphasis on making meaningful contributions to society, serving our valued customers, and
            achieving sustainability goals. We have secured OEM approvals by major American and European car manufacturers."
        reverse={true}
        
      />
      

      <div
        style={{
          display: "flex",
          
          justifyContent: "space-around",
          background: "white",
          marginTop: "2rem",
        }}
        className="container"
      >
        <Card
          description="Our Core Focus is on continuous improvement and striving for excellence in all our operations. 
            We devise effective business strategies to cater to the changing demands of our customers 
            to ensure satisfaction and loyalty. We incorporate an established distribution network, engaging in over 60 countries worldwide."
          addBorder={true}
        />
        <Card
          description="Our Advanced Lubricant Manufacturing Facility is fully equipped with the latest technology and 
            equipment to manufacture high quality products. Our Blending facility is complimented by a sophisticated laboratory and 
            quality control efforts. 
            This integration guarantees premium quality products, exceeding customer expectations."
          addBorder={true}
        />
        <Card
          description="Our Unwavering Commitment to continuous development and innovation 
            enables us to maintain a leading position in the industry. By consistently delivering solutions that effectively address 
            the evolving demands of the lubricant market, we stay ahead of the competition."
          addBorder={true}
        />
      </div>
      <BodyContainer
        image={img1}
        title="The Founder"
        description="The founder of Atlantic Grease and Lubricants embarked on this remarkable venture decades ago, laying the foundation for a company that would leave an indelible mark on the lubricants industry. He first established the company as a trading enterprise of oil and by-products in the 1940’s, followed by building the first manufacturing facility in 1987 Pakistan, Lahore.
            Sheikh Naseem had a passion for innovation, and his dedication to deliver premium lubricant
            solutions, which paved the way for Atlantic’s success. With extensive research and critical
            understanding of lubricants and trends, he sought to create products that would not only meet but
            exceed industry standards.
            Sheikh Naseem’s vision and leadership qualities revolutionized Atlantic Grease and Lubricants
            as a trusted name among customers worldwide. Today Atlantic withholds 6 manufacturing units
            located across the globe, with headquarters residing in the United Arab Emirates. His Legacy
            lives on in our operations, ensuring his vision remains at the core of everything we do at
            Atlantic"
        backgroundColor={theme.colors.primary}
        titleColor={theme.colors.secondary}
      />
     <div className="cards-container">
    <Card
      title="INNOVATION"
      description="Innovation is at the core of our values, by improving and evolving in our industry, 
        by striving to stay ahead of the curve and anticipating the needs of our customers."
      titleBackgroundColor={theme.colors.primary}
      titleColor={theme.colors.secondary}
    />
    <Card
      title="INNOVATION"
      description="Innovation is at the core of our values, by improving and evolving in our industry, 
        by striving to stay ahead of the curve and anticipating the needs of our customers."
      titleBackgroundColor={theme.colors.primary}
      titleColor={theme.colors.secondary}
    />
    <Card
      title="INNOVATION"
      description="Innovation is at the core of our values, by improving and evolving in our industry, 
        by striving to stay ahead of the curve and anticipating the needs of our customers."
      titleBackgroundColor={theme.colors.primary}
      titleColor={theme.colors.secondary}
    />
    <Card
      title="INNOVATION"
      description="Innovation is at the core of our values, by improving and evolving in our industry, 
        by striving to stay ahead of the curve and anticipating the needs of our customers."
      titleBackgroundColor={theme.colors.primary}
      titleColor={theme.colors.secondary}
    />
</div>

      <BodyContainer
      
        image={img2}
        title="Our Mission"
        description="At Atlantic Grease & Lubricants, our mission is to accelerate business transition with a 
        sustainable future in mind. Our strategy, called Lubricating Towards the Future, is designed to deliver value to our customers, 
        and the wider society as a whole. Our focus on sustainability is not just about fulfilling 
        today’s lubricant needs for industries but also about finding renewable resources for future generations."
        title2="Our Vision"
        description2="Our vision as a brand is to leverage business insights to provide valuable products 
        that generate success for its customers and users. Moreover, we are committed to sustainability and reducing the environmental 
        impacts of our production. With our dedication to performance, nonstop development, and sustainability, we view AGL as being the 
        top company that comes to the mind of our customers when they need lubricating their machinery 
        in any region of the world. So our vision is to provide a one-window solution to our customers according to their needs."
      />
    </div>
  );
};

export default About;
