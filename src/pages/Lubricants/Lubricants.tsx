import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import img from '../../assets/mt-1869-gallery-09bg.jpg';

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
        <div className="text-left">
            <img src={img} className="w-full h-96 object-cover" />

            <div className={`flex ${showCategories || windowWidth < 768 ? 'flex-col' : 'flex-row'}`}>
                {/* Show menu button only on small screens */}
                {windowWidth < 768 && (
                    <div className="w-full flex justify-center">
                        <button
                            className="block p-2 m-4 rounded-full bg-blue-500 text-white cursor-pointer w-12 h-12"
                            onClick={() => setShowCategories(prev => !prev)}
                        >
                            {showCategories ? '✕' : '☰'}
                        </button>
                    </div>
                )}

                {/* Categories Displayed Above Items */}
                {(windowWidth >= 768 || showCategories) && (
                    <div className="p-4 mt-8 flex flex-col items-center flex-1">
                        <h2 className="m-0 text-lg font-bold">Categories</h2>
                        <ul className="list-none p-0">
                            {loading ? (
                                <li>Loading categories...</li>
                            ) : error ? (
                                <li>{error}</li>
                            ) : (
                                categories.length === 0 ? (
                                    <li>No categories found.</li>
                                ) : (
                                    categories.map((category) => (
                                        <li key={category.id} className="ml-4">
                                            <Link to={`/category/${category.id}`} className="text-blue-600 hover:underline">{category.name}</Link>
                                        </li>
                                    ))
                                )
                            )}
                        </ul>
                    </div>
                )}

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(245px,_1fr))] gap-4 p-8 w-5/6 flex-7">
                    {loading ? (
                        <p>Loading items...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        items.length === 0 ? (
                            <p>No items found in this category.</p>
                        ) : (
                            items.map((item) => (
                                <Link key={item.id} to={`/inventory/${item.id}`} className="no-underline">
                                    <div className="p-4 text-left">
                                        <img
                                            src={item.image}
                                            alt={item.inventory_name}
                                            className="w-full h-40 object-cover"
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

export default CategoryDetails;
