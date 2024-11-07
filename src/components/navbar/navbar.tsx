import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/Atlanticlubes-logo.png (1).webp";
import { Mail, Phone } from "lucide-react";
import "./index.css";
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`px-4 py-4 flex items-center ${
        isMenuOpen ? "h-screen bg-white" : "bg-transparent"
      } transition-all duration-300`}
    >
      {/* Logo */}
      <Link to="/" onClick={handleLinkClick} className="flex-shrink-0 flex-1">
      <div
        style={{
          backgroundImage: `url("${img}")` ,
          width: "8rem",
          height: "64px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          pointerEvents: "none", // Prevents interaction with the image itself
        }}
        className="h-16" // Adjust height if needed
      ></div>
    </Link>

      {/* Menu Button for Mobile */}
      {isMobile && (
        <button onClick={toggleMenu} className="text-2xl cursor-pointer">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      )}

      {/* Navigation Menu */}
      {(isMobile && isMenuOpen) || !isMobile ? (
        <div className="flex justify-around class">
          <ul
            className={`flex ${
              isMobile && isMenuOpen
                ? "flex-col items-center w-full h-full absolute top-0 left-0 bg-white p-4"
                : "flex-row gap-6 items-center"
            }`}
          >
            <li className="my-4">
              <Link
                to="/"
                className="text-black no-underline"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="my-4">
              <a
                href="/#about"
                className="text-black no-underline"
                onClick={handleLinkClick}
              >
                About
              </a>
            </li>
            <li className="my-4">
              <Link
                to="/contact"
                className="text-black no-underline"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>
            <li className="my-4">
              <Link
                to="/products"
                className="text-black no-underline"
                onClick={handleLinkClick}
              >
                Products
              </Link>
            </li>
          </ul>
          <div className="md:flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <Mail size={24} color="#000" />
              <a
                href="mailto:Info@schmierol.de"
                className="text-black hover:text-blue-500"
              >
                Info@schmierol.de
              </a>
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <Phone size={24} color="#000" />
              <a
                href="tel:+491788854076"
                className="text-black hover:text-blue-500"
              >
                +49 178 8854076
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {/* Contact Info */}
    </nav>
  );
};

export default Navbar;
