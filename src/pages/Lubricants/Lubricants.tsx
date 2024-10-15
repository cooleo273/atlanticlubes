import React, { useEffect, useState } from 'react';
import ImageWithTitle from '../../components/Imagewithtitle/Imagewithtitle'; // Adjust the path as needed
import img from "../../assets/Atlantic-Lubes-web-header-4.webp"; // Header image
import './index.css';
import { useNavigate } from 'react-router-dom';

const Lubricants: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [inventoryData, setInventoryData] = useState([]); // State for inventory data
    const [loading, setLoading] = useState(true); // State for loading
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    // Fetch inventory data from the backend
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://atlanticlubesbackend-63sviec2p-leuls-projects-1970b214.vercel.app/api/inventory');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setInventoryData(data); // Update inventory data
                setLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setLoading(false); // Stop loading even if there is an error
            }
        };
        
        fetchInventory();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <div style={layoutStyle}>
            {/* Main Content */}
            <div style={mainContentStyle}>
                <img src={img} alt="Header" style={{ width: '100%', height: "30rem", objectFit: "cover" }} className='image' />

                <input
                    type="text"
                    placeholder="Search for a plan..."
                    style={searchInputStyle}
                />

                <div style={{ display: 'flex' }} className='sidebar-button'>
                    {/* Sidebar toggle button (only visible on small screens) */}
                    <button onClick={toggleSidebar} className="menu-button">
                        {isSidebarOpen ? 'X' : '☰'}
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

                    {/* Inventory Grid */}
                    <div style={gridStyle}>
        {inventoryData.map((item: { id: string; inventory_name: string; image: string }) => (
            <div 
                key={item.id} 
                onClick={() => navigate(`/inventory/${item.id}`)}
                style={{ cursor: 'pointer' }}
            >
                <ImageWithTitle title={item.inventory_name} image={item.image} />
            </div>
        ))}
    </div>
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
    textAlign:"left",
    gap: '1rem',
};

const mainContentStyle: React.CSSProperties = {
    flexGrow: 1,
    textAlign: 'center',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(187px, 1fr))',
    gap: '3rem',
    padding: '5rem',
    flex:"5"
};

const searchInputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '1rem',
    width: '80%',
    maxWidth: '400px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '3rem',
};

export default Lubricants;
