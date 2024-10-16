import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

interface Category {
    id: number;
    name: string;
}

const InventoryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [itemData, setItemData] = useState<InventoryItem | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); // State for categories
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update window width on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/inventory/${id}`);
                if (!response.ok) throw new Error('Error fetching item details');
                const data = await response.json();
                setItemData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/category`);
                if (!response.ok) throw new Error('Error fetching categories');
                const data = await response.json();
                setCategories(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchItemDetails();
        fetchCategories(); // Call to fetch categories
    }, [id]);

    if (loading) {
        return (
            <div style={loadingContainerStyle}>
                <div className="spinner"></div> {/* Circular Loader */}
            </div>
        );
    }

    if (error) return <div>Error: {error}</div>;
    if (!itemData) return <div>No item data found</div>;

    return (
        <div style={containerStyle}>
            <img src={img} alt="Header" style={{ width: '100%', height: "30rem", objectFit: "cover" }} className='image' />

            <div style={{ ...layoutStyle, flexDirection: showCategories || windowWidth < 768 ? 'column' : 'row' }}>
                {/* Show menu button only on small screens */}
                {windowWidth < 768 && (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <button
                            style={menuButtonStyle}
                            onClick={() => setShowCategories(prev => !prev)}
                        >
                            {showCategories ? '✕' : '☰'}
                        </button>
                    </div>
                )}

                {/* Categories Displayed Above Items */}
                {(windowWidth >= 768 || showCategories) && (
                    <div style={categoriesStyle}>
                        <h2 style={hstyle}>Categories</h2>
                        <ul style={categoriesListStyle}>
                            {categories.length === 0 ? (
                                <li>No categories found.</li>
                            ) : (
                                categories.map((category) => (
                                    <li key={category.id} style={{ marginLeft: "1rem" }}>
                                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}

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
    );
};

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

// Custom styles
const containerStyle: React.CSSProperties = {
    textAlign: 'left',
};

const hstyle: React.CSSProperties = {
    margin: "0",
    fontSize: "1.2rem",
    fontWeight: "bold",
};

const layoutStyle: React.CSSProperties = {
    display: 'flex',
};

const loadingContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const menuButtonStyle: React.CSSProperties = {
    display: 'block',
    padding: '0.5rem 1rem',
    margin: '1rem 0',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    width: "3rem",
    height: "3rem",
};

const categoriesStyle: React.CSSProperties = {
    padding: '1rem',
    marginTop:"5rem",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const categoriesListStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
};

export default InventoryDetail;
