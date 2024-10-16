import React, { useEffect, useState } from 'react';
import ImageWithTitle from '../../components/Imagewithtitle/Imagewithtitle';
import img from "../../assets/image-25.png";
import './index.css';
import { useNavigate } from 'react-router-dom';

const Lubricants: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [inventoryData, setInventoryData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); // For filtered search results
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://atlanticlubesbackend.vercel.app/api/inventory');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setInventoryData(data);
                setFilteredData(data); // Initialize filtered data with full inventory
                setLoading(false);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    // Handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = inventoryData.filter((item: any) =>
            item.inventory_name.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    if (loading) {
        return (
            <div style={loadingContainerStyle}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div style={layoutStyle}>
            <div style={mainContentStyle}>
                <img src={img} alt="Header" style={{ width: '100%', height: "30rem", objectFit: "cover" }} className='image' />

                <input
                    type="text"
                    placeholder="Search for a product..."
                    style={searchInputStyle}
                    value={searchQuery}
                    onChange={handleSearch} // Handle search input change
                />

                <div style={{ display: 'flex' }} className='sidebar-button'>
                    <button onClick={toggleSidebar} className="menu-button">
                        {isSidebarOpen ? 'X' : '☰'}
                    </button>

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

                    <div style={gridStyle}>
                        {filteredData.length > 0 ? (
                            filteredData.map((item: { id: string; inventory_name: string; image: string }) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => navigate(`/inventory/${item.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ImageWithTitle title={item.inventory_name} image={item.image} />
                                </div>
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
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
    textAlign: "left",
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
    flex: "5",
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

const loadingContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

export default Lubricants;
