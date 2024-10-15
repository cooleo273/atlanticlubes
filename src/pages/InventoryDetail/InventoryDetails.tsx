import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageWithTitle from '../../components/Imagewithtitle/Imagewithtitle'; // Adjust the path as needed
import img from "../../assets/Atlantic-Lubes-web-header-4.webp"; // Header image
import './index.css'; // Importing custom CSS

interface InventoryItem {
    inventory_name: string;
    image: string;
    description: string;
    recommendations: string[] | null;
    application: string[] | null;
    performance: string[] | null;
    properties: string[] | null;
}

const InventoryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [itemData, setItemData] = useState<InventoryItem | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
    const [loading, setLoading] = useState(true); // State for loading

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/inventory/${id}`);
                if (!response.ok) throw new Error('Error fetching item details');
                const data = await response.json();
                setItemData(data);
                setLoading(false); // Stop loading after data is fetched
            } catch (err: any) {
                setError(err.message);
                setLoading(false); // Stop loading even if there is an error
            }
        };
        fetchItemDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!itemData) return <div>No item data found</div>;

    // Helper function to render array data as a list
    const renderList = (title: string, items: string[] | null) => (
        <div className="section">
            <h2>{title}</h2>
            {Array.isArray(items) && items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No {title.toLowerCase()} available</p>
            )}
        </div>
    );

    return (
        <div style={layoutStyle}>
            <div style={mainContentStyle}>
                <img src={img} alt="Header" style={{ width: '100%', height: "30rem", objectFit: "cover" }} className='image' />

                {/* Sidebar toggle button */}
                <div style={{display:"flex", flexDirection:"row"}}>
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

                <div className="inventory-detail-container">
                    <div className="inventory-header">
                        <img src={itemData.image} alt={itemData.inventory_name} />
                        <div className="inventory-info">
                            <h1>{itemData.inventory_name}</h1>
                            <p>{itemData.description}</p>
                            {renderList('Recommendations', itemData.recommendations)}
                            {renderList('Application', itemData.application)}
                            {renderList('Performance', itemData.performance)}
                            {renderList('Properties', itemData.properties)}
                        </div>
                    </div>
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
    textAlign: 'left',
    gap: '1rem',
};

const mainContentStyle: React.CSSProperties = {
    flexGrow: 1,
    textAlign: 'center',
};

export default InventoryDetail;
