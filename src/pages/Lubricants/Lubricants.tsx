import React, { useState } from 'react';
import ImageWithTitle from '../../components/Imagewithtitle/Imagewithtitle'; // Adjust the path as needed
import yourImage from '../../assets/Atlantic-Super-Synthetic-Sae-0w-40-API-Sn-1-300x300.webp';
import img from "../../assets/Atlantic-Lubes-web-header-4.webp"; // Update with your image path
import './index.css';

const Lubricants: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={layoutStyle}>
           

            {/* Main Content */}
            <div style={mainContentStyle}>
                <img src={img} alt="Header" style={{ width: '100%' }} />

                <input
                    type="text"
                    placeholder="Search for a plan..."
                    style={searchInputStyle}
                />

                <div style={{ display: 'flex' }} className='sidebar-button'>
                     {/* Sidebar toggle button (only visible on small screens) */}
            <button onClick={toggleSidebar} className="menu-button">
                {isSidebarOpen ? 'X' : '☰'} {/* Display X when open, ☰ when closed */}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Categories</h2>
                <ul style={sidebarListStyle}>
                    <li><a href="#automotive">Automotive Lubricants</a></li>
                    <li><a href="#industrial">Industrial Lubricants</a></li>
                    <li><a href="#marine">Marine Lubricants</a></li>
                    <li><a href="#greases">Greases</a></li>
                    <li><a href="#specialty">Specialty Lubricants</a></li>
                </ul>
            </aside>
                    <a href="/lubricants" style={{ flex: 5 }}>
                        <div style={gridStyle}>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <ImageWithTitle
                                    key={index}
                                    title="Automotive Lubricants"
                                    image={yourImage}
                                />
                            ))}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

// Custom styles
const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
};

const sidebarListStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

const mainContentStyle: React.CSSProperties = {
    flexGrow: 1,
    textAlign: 'center',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Adjust the min width as needed
    gap: '1rem', // Space between grid items
    padding: '5rem',
};

const searchInputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '1rem',
    width: '80%', // Adjust the width as needed
    maxWidth: '400px', // Maximum width for the search input
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '3rem',
};

export default Lubricants;
