import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme/theme';
import img from "../../assets/Atlanticlubes-logo.png (1).webp";
import Button from '../button/button';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav style={{ padding: theme.spacing.medium, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Logo */}
            <img src={img} alt="Logo" style={{ margin: 0, padding: 0, width: "200px" }} />

            {/* Menu Button */}
            <div style={menuButtonStyle} onClick={toggleMenu}>
                {isMenuOpen ? "X" : "☰"} {/* Show 'X' if open, else show ☰ */}
            </div>

            {/* Navigation Menu */}
            <ul style={{ ...navListStyle, display: isMenuOpen ? "flex" : "none" }}>
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
    position: 'absolute', // Position the nav items absolutely on top of the page when open
    top: '60px', // Adjust the top distance to match the height of your navbar
    right: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    width: '200px',
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
