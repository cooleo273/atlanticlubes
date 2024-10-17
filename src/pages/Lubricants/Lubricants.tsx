import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import img from '../../assets/mt-1869-gallery-09bg.jpg';
import './index.css';

interface InventoryItem {
    id: number;
    inventory_name: string;
    image: string;
    description: string;
}

interface Category {
    id: number;
    name: string;
}

const CategoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
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

    // Fetch inventory items for the selected category
    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log(`Fetching items for category ID: ${id}`);
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/inventory?categoryId=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched items:', data);
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Error fetching items');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/category`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched categories:', data);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories');
            }
        };

        fetchItems();
        fetchCategories();
    }, [id]);

    return (
        <div style={containerStyle}>
            <img
                src={img}
                style={{ width: '100%', height: '30rem', objectFit: 'cover' }}
                className="image"
            />

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
                            {loading ? (
                                <li>Loading categories...</li>
                            ) : error ? (
                                <li>{error}</li>
                            ) : (
                                categories.length === 0 ? (
                                    <li>No categories found.</li>
                                ) : (
                                    categories.map((category) => (
                                        <li key={category.id} style={{ marginLeft: "1rem" }}>
                                            <Link to={`/category/${category.id}`}>{category.name}</Link>
                                        </li>
                                    ))
                                )
                            )}
                        </ul>
                    </div>
                )}

                <div style={gridStyle}>
                    {loading ? (
                        <p>Loading items...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        items.length === 0 ? (
                            <p>No items found in this category.</p>
                        ) : (
                            items.map((item) => (
                                <Link key={item.id} to={`/inventory/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <div style={itemStyle}>
                                        <img
                                            src={item.image}
                                            alt={item.inventory_name}
                                            style={{ width: '100%', height: '10rem', objectFit: 'cover' }}
                                        />
                                        <h3>{item.inventory_name}</h3>
                                    </div>
                                </Link>
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

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
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex:"1"
};

const categoriesListStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))',
    gap: '1rem',
    padding: '2rem',
    width:"85%",
    flex:"7"
};

const itemStyle: React.CSSProperties = {
    padding: '1rem',
    textAlign: 'left',
};

export default CategoryDetails;
