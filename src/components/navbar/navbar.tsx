import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/Atlanticlubes-logo.png (1).webp";
import Button from '../button/button';
import { Mail, Phone } from 'lucide-react';

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
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className={`px-20 py-4 flex justify-between items-center ${isMenuOpen ? 'h-screen bg-white' : 'bg-transparent'}`}>
            {/* Logo */}
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
                <img src={img} alt="Logo" className="w-48" />
            </Link>

            {/* Menu Button for Mobile */}
            {isMobile && (
                <button onClick={toggleMenu} className="text-2xl cursor-pointer mr-4">
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            )}

            {/* Navigation Menu */}
            {(isMobile && isMenuOpen) || !isMobile ? (
                <ul
                    className={`flex ${isMobile && isMenuOpen ? 'flex-col items-center w-full h-full absolute top-0 left-0 bg-white' : 'flex-row gap-12 items-center'}`}
                >
                    <li className="my-4">
                        <Link to="/" className="text-black no-underline" onClick={handleLinkClick}>Home</Link>
                    </li>
                    <li className="my-4">
                        <a href="/#about" className="text-black no-underline" onClick={handleLinkClick}>About</a>
                    </li>
                    <li className="my-4">
                        <Link to="/contact" className="text-black no-underline" onClick={handleLinkClick}>Contact Us</Link>
                    </li>
                    <li className="my-4">
                        <Link to="/products" className="text-black no-underline" onClick={handleLinkClick}>Products</Link>
                    </li>
                    
                </ul>
            ) : null}
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-4 cursor-pointer'>
            <Mail size={24} color="#000" />
            <p>Info@schmierol.de</p>
            </div>
            <div  className='flex flex-row gap-4 cursor-pointer'>
                <Phone size={24} color='#000'/>
                <p>+49 178 8854076</p>
            </div>
            </div>
        </nav>
    );
};

export default Navbar;
