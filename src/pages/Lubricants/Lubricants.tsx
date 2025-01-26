import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import img from '../../assets/ImageSlider/mt-1869-gallery-09bg.jpg';
import { ClipLoader } from 'react-spinners';

interface InventoryItem {
    id: number;
    inventory_name: string;
    inventory__slug: string;
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
    const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/inventory?categoryId=${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log(data);
                setItems(data);
                setFilteredItems(data);
            } catch (error) {
                setError('Error fetching items');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://atlanticlubesbackend.vercel.app/api/category`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError('Error fetching categories');
            }
        };

        fetchItems();
        fetchCategories();
    }, [id]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredItems(items);
        } else {
            setFilteredItems(
                items.filter(item =>
                    item.inventory_name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, items]);

    // Display loading spinner if data is loading
    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <ClipLoader size={50} color="#007bff" />
        </div>
        );
    }

    return (
        <div className="text-left bg-white">
            <img src={img} alt='asdas' className="w-full h-80 object-cover mb-8" />

            <div className={`flex ${showCategories || windowWidth < 768 ? 'flex-col' : 'flex-row'}`}>
                {windowWidth < 768 && (
                    <div className="w-full flex justify-center mb-4">
                        <button
                            className="p-2 rounded-full bg-blue-600 text-white w-10 h-10 flex items-center justify-center"
                            onClick={() => setShowCategories(prev => !prev)}
                        >
                            {showCategories ? '✕' : '☰'}
                        </button>
                    </div>
                )}

                {(windowWidth >= 768 || showCategories) && (
                    <div className="p-4 bg-white mt-4 w-full max-w-xs">
                        <h2 className="text-lg font-bold text-black mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {error ? (
                                <li className="text-red-500">{error}</li>
                            ) : (
                                categories.map(category => (
                                    <li key={category.id} className="text-black hover:text-blue-700">
                                        <Link to={`/category/${category.id}`} className="block p-2 hover:bg-blue-50 rounded">
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}

                <div>
                    <div className="p-4 w-full max-w-sm mx-auto">
                        <input
                            type="text"
                            placeholder="Search for items..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full flex-1">
                        
                        {error ? (
                            <p className="text-center col-span-full text-red-500">{error}</p>
                        ) : filteredItems.length === 0 ? (
                            <p className="text-center col-span-full text-gray-500">No items found in this category.</p>
                        ) : (
                            filteredItems.map(item => (
                                <Link key={item.id} to={`/inventory/${item.inventory__slug}`} className="group">

                                    
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-72">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.inventory_name}
                                                className="w-full h-48 object-contain group-hover:opacity-80 transition-opacity duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 text-white font-semibold text-lg">
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-md font-semibold text-gray-800 text-center transition-colors">
                                                {item.inventory_name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;
