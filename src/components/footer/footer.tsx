import React from "react";
import "./index.css"; // For custom styles
import img from "../../assets/Atlanticlubes-logo.png (1).webp"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section">
          <h5>ABOUT COMPANY</h5>
          <img src={img} alt="logo"/>
          <p>
          Atlantic Lubes is a premier quality lubricant product manufacturer and supplier all over the world with certified ISO 9001-2015, ISO 17025-2015, & ISO 14001-2015 17025-BN14013
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul className="footer-links">
            <li>
              <a href="/home">Certifications & Approvals</a>
            </li>
            <li>
              <a href="/about">Privacy Policy</a>
            </li>
            <li>
              <a href="/pricing">Interested Parties</a>
            </li>
            <li>
              <a href="/blog">IMS Policy</a>
            </li>
            <li>
              <a href="/contact">HSE</a>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div className="footer-section">
          <h5>Get in Touch</h5>
          <ul className="footer-links">
            <li>
              <a href="tel:+1234567890">T +971-(06)-5264688</a>
            </li>
            <li>
              <a href="mailto:info@atlanticlubes.com">
              Email: info@atlanticlubes.com
              </a>
            </li>
            <h5>Head Office</h5>
            <li>
              <a
                href="https://maps.google.com/?q=Your+Address"
                target="_blank"
                rel="noopener noreferrer"
              >
                Atlantic Grease and Lubricants, Hamriyah Freezone P.O.BOX 41583, Sharjah, United Arab Emirates
              </a>
            </li>
            <li>
              <a href="/support">Open in Google Maps</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
