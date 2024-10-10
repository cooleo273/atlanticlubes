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

    useEffect(() => {
        window.addEventListener('resize', handleResize); // Add event listener
        return () => {
            window.removeEventListener('resize', handleResize); // Clean up
        };
    }, []);

    return (
        <nav style={{ padding: theme.spacing.medium, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Logo */}
            <img src={img} alt="Logo" style={{ margin: 0, padding: 0, width: "200px" }} />

            {/* Menu Button */}
            {isMobile && (
                <div style={menuButtonStyle} onClick={toggleMenu}>
                    {isMenuOpen ? "X" : "☰"} {/* Show 'X' if open, else show ☰ */}
                </div>
            )}

            {/* Navigation Menu */}
            {(isMobile && isMenuOpen) || !isMobile ? (
                <ul style={{ ...navListStyle, ...mobileListStyle, display: isMobile && !isMenuOpen ? "none" : "flex" }}>
                    <li style={navItemStyle}>
                        <Link to="/" style={navLinkStyle}>Home</Link>
                    </li>
                    <li style={navItemStyle}>
                        <Link to="/about" style={navLinkStyle}>About</Link>
                    </li>
                    <li style={navItemStyle}>
                        <Link to="/contact" style={navLinkStyle}>Contact Us</Link>
                    </li>
                    <li style={navItemStyle}>
                        <Link to="/products" style={navLinkStyle}>Products</Link>
                    </li>
                    <li style={navItemStyle}>
                        <Link to="/blog" style={navLinkStyle}>Blog</Link>
                    </li>
                    <li style={navItemStyle}>
                        <Button label="Become A Distributor" />
                    </li>
                </ul>
            ) : null}
        </nav>
    );
};

// Custom styles
const menuButtonStyle: React.CSSProperties = {
    fontSize: '24px',
    cursor: 'pointer',
    display: 'block', // Always show the menu button
    marginRight: '1rem',
};

const navListStyle: React.CSSProperties = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column', // Make the items stack vertically on mobile when open
};

const mobileListStyle: React.CSSProperties = {
    // Mobile-specific styles
    alignItems: 'center',
    
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    
    gap: 10,
    zIndex: 1000, // Ensure the menu appears on top of other elements
};

const navItemStyle: React.CSSProperties = {
    display: 'inline-block',
    margin: '1rem 0', // Add some margin between items
    textAlign: 'center',
};

const navLinkStyle: React.CSSProperties = {
    color: 'black',
    textDecoration: 'none',
    padding: '10px',
};

export default Navbar;
