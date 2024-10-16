import React, { useEffect, useState } from 'react';
import yourImage from '../../assets/whatsapp-image-2023-03-31-at-10.51.07.jpeg'; // Optional default image
import img from '../../assets/mt-1869-gallery-09bg.jpg';
import './index.css';

interface Category {
    id: number;
    name: string;
    description?: string;
}

const Product: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://atlanticlubesbackend.vercel.app/api/category'); // Adjust your API URL
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div style={containerStyle}>
            <img
                src={img}
                style={{ width: '100%', height: '30rem', objectFit: 'cover' }}
                className="image"
            />

            <input
                type="text"
                placeholder="Search for a category..."
                style={searchInputStyle}
            />

            <div style={gridStyle}>
                {loading ? (
                    <p>Loading categories...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    categories.map((category) => (
                        <a key={category.id} href={`/category/${category.id}`}>
                            <div style={categoryStyle}>
                                <img
                                    src={yourImage}
                                    alt={category.name}
                                    style={{ width: '100%', height: '10rem', objectFit: 'cover' }}
                                />
                                <h3>{category.name}</h3>
                                <p>{category.description}</p>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
};

// Custom styles
const containerStyle: React.CSSProperties = {
    textAlign: 'center',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
    padding: '2rem',
};

const searchInputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '1rem',
    width: '80%',
    maxWidth: '400px',
   
   
    marginTop: '3rem',
};

const categoryStyle: React.CSSProperties = {
    
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'left',
    transition: 'transform 0.2s',
    cursor: 'pointer',
};

export default Product;
