import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import img from '../../assets/mt-1869-gallery-09bg.jpg'; // Default image if needed
import './index.css'; // Import your styles

interface InventoryItem {
    id: number;
    inventory_name: string;
    image: string;
    description: string;
}

const CategoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get category ID from the URL
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch inventory items for the selected category
    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log(`Fetching items for category ID: ${id}`); // Log the category ID
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/inventory?categoryId=${id}`);
                
                // Check if response is okay
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched items:', data); // Log the fetched items
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Error fetching items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [id]);

    return (
        <div style={containerStyle}>
            <img
                src={img}
                style={{ width: '100%', height: '30rem', objectFit: 'cover' }}
                className="image"
            />
            
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
    );
};

// Custom styles
const containerStyle: React.CSSProperties = {
    textAlign: 'left',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
    padding: '2rem',
};

const itemStyle: React.CSSProperties = {
    padding: '1rem',
    textAlign: 'left',
};

export default CategoryDetails;
