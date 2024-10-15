import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme/theme';
import img from "../../assets/Atlanticlubes-logo.png (1).webp";
import Button from '../button/button';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track mobile view

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Update state on resize
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Close menu when a link is clicked
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize); // Add event listener
        return () => {
            window.removeEventListener('resize', handleResize); // Clean up
        };
    }, []);

    return (
        <nav style={{ 
            padding: theme.spacing.medium, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            position: "relative",
            height: isMenuOpen ? "100vh" : "auto", // Take full height when menu is open
            backgroundColor: isMenuOpen ? "white" : "transparent", // Change background color when menu is open
            transition: "background-color 0.3s ease" // Smooth transition for background color
        }}>
            {/* Logo */}
            <img src={img} alt="Logo" style={{ margin: 0, padding: 0, width: "200px" }} />

            <div>
                {/* Menu Button */}
                {isMobile && (
                    <div style={menuButtonStyle} onClick={toggleMenu}>
                        {isMenuOpen ? "X" : "☰"} {/* Show 'X' if open, else show ☰ */}
                    </div>
                )}

                {/* Navigation Menu */}
                {(isMobile && isMenuOpen) || !isMobile ? (
                    <ul style={{ 
                        ...navListStyle, 
                        display: isMobile && !isMenuOpen ? "none" : "flex", 
                        gap:"2rem",
                        flexDirection: isMobile && isMenuOpen ? 'column' : 'row',
                        height: isMenuOpen ? "100%" : "auto", // Take full height when menu is open
                        width: isMenuOpen ? "100%" : "auto", // Take full width when menu is open
                        position: isMenuOpen ? "absolute" : "relative", // Position absolute when open
                        top: 0, // Align to the top
                        left: 0, // Align to the left
                        backgroundColor: isMenuOpen ? "white" : "transparent" // Change background color when menu is open
                    }}>
                        <li style={navItemStyle}>
                            <Link to="/" style={navLinkStyle} onClick={handleLinkClick}>Home</Link>
                        </li>
                        <li style={navItemStyle}>
                            <Link to="/about" style={navLinkStyle} onClick={handleLinkClick}>About</Link>
                        </li>
                        <li style={navItemStyle}>
                            <Link to="/contact" style={navLinkStyle} onClick={handleLinkClick}>Contact Us</Link>
                        </li>
                        <li style={navItemStyle}>
                            <Link to="/products" style={navLinkStyle} onClick={handleLinkClick}>Products</Link>
                        </li>
                        <li style={navItemStyle}>
                            <Link to="/blog" style={navLinkStyle} onClick={handleLinkClick}>Blog</Link>
                        </li>
                        <li style={navItemStyle}>
                            <Button label="Become A Distributor" />
                        </li>
                    </ul>
                ) : null}
            </div>
        </nav>
    );
};

// Custom styles
const menuButtonStyle: React.CSSProperties = {
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex', // Always show the menu button
    marginRight: '1rem',
    justifyContent: 'center',
};

const navListStyle: React.CSSProperties = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    boxShadow: 'none', // Ensure box shadow is removed
};

const navItemStyle: React.CSSProperties = {
    
    margin: '1rem 0', // Add some margin between items
    textAlign: 'center',
    display: "flex",
    justifyContent: "center",
};

const navLinkStyle: React.CSSProperties = {
    color: 'black',
    textDecoration: 'none',
    padding: '10px',
    display: "flex",
    alignItems: "center",
    gap: "2rem"
};

export default Navbar;
