import React from "react";
import { Phone, Mail, MapPin, ThumbsUp, Share2, Facebook } from "lucide-react";
import img from "../../assets/Atlanticlubes-logo.png (1).webp";

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "black", color: "#fff", paddingTop: "20px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexWrap: "wrap",
        padding:"2rem 3rem",
        gap:"4rem"
      }}>
        {/* About Us Section */}
        <div style={{ flex: 1, minWidth: "200px", margin: "20px" }}>
          <a href="https://www.facebook.com/YOUR_FACEBOOK_PAGE" target="_blank" rel="noopener noreferrer">
            <img src={img} alt="logo" style={{ width: "150px", marginBottom: "10px" }} />
          </a>
          <p className="text-sm mt-7 leading-relaxed">
            SCHMIERÖL offers a variety of products specifically tailored for the lubricants industry. Our custom-made blends have always proven to be successful.
            Work smarter, not harder. Choose SCHMIERÖL.
          </p>
        </div>

        {/* Get in Touch Section */}
        <div style={{ flex: 1, minWidth: "200px", margin: "10px" }}>
          <h5 style={{ marginBottom: "10px" }}>Get in Touch</h5>
          <ul style={{ listStyle: "none", padding: 0 }} className="text-sm">
            <li style={{ margin: "8px 0", display:"flex", gap:"1rem", alignItems:"center" }}>
              <Phone style={{ color: "#fff", marginRight: "5px" }} size={16} /> 
              <a href="tel:+491788854076" style={{ color: "#fff", textDecoration: "none" }}>+49 178 8854076</a>
            </li>
            <li style={{ margin: "8px 0", display:"flex", gap:"1rem", alignItems:"center"  }}>
              <Mail style={{ color: "#fff", marginRight: "5px" }} size={16} />
              <a href="mailto:Info@schmierol.de" style={{ color: "#fff", textDecoration: "none" }}>Info@schmierol.de</a>
            </li>
            <h5 style={{ margin: "10px 0" }}>Head Office</h5>
            <li style={{ margin: "8px 0", display:"flex", gap:"1rem", alignItems:"center"  }}>
              <MapPin style={{ color: "#fff", marginRight: "5px" }} size={16} />
              <a href="https://maps.google.com/?q=IndustrialParkArea24,Hamburg,Germany" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>
                11 Industrial Park Area 24, Hamburg, Germany
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div style={{ flex: 1, minWidth: "200px", margin: "10px" }}>
          <h5 style={{ marginBottom: "10px" }}>Follow Us</h5>
          <div style={{ display: "flex", gap: "15px", flexDirection:"column"}}>
            <a href="https://www.facebook.com/YOUR_FACEBOOK_PAGE" target="_blank" rel="noopener noreferrer" style={{ color: "white", display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Facebook size={18} style={{ marginRight: "5px", color:"white" }} /> Facebook
            </a>
            <div style={{display:"flex", gap:"1rem"}}>
            <button style={{
              backgroundColor: "#555", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px", display: "flex", alignItems: "center"
            }}>
              <ThumbsUp size={16} style={{ marginRight: "5px" }} /> Like
            </button>
            <button style={{
              backgroundColor: "#555", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px", display: "flex", alignItems: "center"
            }}>
              <Share2 size={16} style={{ marginRight: "5px" }} /> Share
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{
        textAlign: "center", padding: "10px 0", backgroundColor: "#222", fontSize: "0.9rem", color: "#bbb"
      }}>
        © 2022 SCHMIERÖL - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
