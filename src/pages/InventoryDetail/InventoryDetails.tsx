import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import img from "../../assets/Atlantic-Lubes-web-header-4.webp"; // Header image
import { ClipLoader } from 'react-spinners';

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        fetchCategories();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#36D7B7" loading={loading} size={60} />
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!itemData) return <div className="text-center">No item data found</div>;

    return (
        <div className="bg-white text-left min-h-screen">

            <div className={`flex ${showCategories || windowWidth < 768 ? 'flex-col' : 'flex-row'} p-4`}>
                {windowWidth < 768 && (
                    <div className="flex justify-center w-full mb-4">
                        <button
                            className="p-2 bg-blue-600 text-white rounded-full shadow-lg transition duration-300 hover:bg-blue-500"
                            onClick={() => setShowCategories(prev => !prev)}
                        >
                            {showCategories ? '✕' : '☰'}
                        </button>
                    </div>
                )}

                {(windowWidth >= 768 || showCategories) && (
                    <div className="bg-white py-4 px-2 w-full md:w-1/4 lg:w-1/6">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">Categories</h2>
                        <ul className="list-none">
                            {categories.length === 0 ? (
                                <li className="text-gray-600">No categories found.</li>
                            ) : (
                                categories.map((category) => (
                                    <li key={category.id} className="my-1">
                                        <Link to={`/category/${category.id}`} className="block p-2 hover:bg-blue-50 rounded hover:text-blue-500">
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}

                <div className="inventory-detail-container w-full md:w-3/4 lg:w-5/6 px-4 md:px-8 py-4">
                    <div className="flex flex-col overflow-hidden bg-white ">
                        <img src={itemData.image} alt={itemData.inventory_name} className="w-full h-64 md:h-80 object-contain" />
                        <div className="inventory-info p-4">
                            <h1 className="text-2xl font-bold text-gray-800">{itemData.inventory_name}</h1>
                            <p className="text-gray-600 mt-2">{itemData.description}</p>
                            {renderStyledList('Application', itemData.application)}
                            {renderStyledList('Performance', itemData.performance)}
                            {renderStyledList('Properties', itemData.properties)}
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-2">Recommendations</h2>
                            <p className='text-gray-600 mt-2'>{itemData.recommendations}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to render array data as a styled list
const renderStyledList = (title: string, items: string[] | null) => (
    <div className="section mt-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">{title}</h2>
        {Array.isArray(items) && items.length > 0 ? (
            <ul className="list-none text-gray-600 space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition duration-200">
                        {item}
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-500">No {title.toLowerCase()} available</p>
        )}
    </div>
);

export default InventoryDetail;
