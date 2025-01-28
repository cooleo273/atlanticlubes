import React, { useEffect, useState } from 'react';
import img from '../../assets/ImageSlider/mt-1869-gallery-09bg.jpg';
import { ClipLoader } from 'react-spinners';

interface Category {
    id: number;
    name: string;
    description?: string;
    image?: string; // Optional image property
}

const Product: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search input

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://shimerolbackend.vercel.app/api/category'); // Adjust your API URL
                const data = await response.json();
                setCategories(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Filter categories based on the search query
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative flex flex-col items-center min-h-screen">
            {/* Background Image */}
            <img
                src={img}
                alt="Background"
                className="w-full h-80 object-cover mb-8"
            />

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <ClipLoader size={50} color="#007bff" />
                </div>
            )}

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for a category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                className="w-4/5 max-w-lg p-3 mb-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full max-w-7xl">
                {error ? (
                    <p className="text-center col-span-full text-red-500">{error}</p>
                ) : (
                    filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <a
                                key={category.id}
                                href={`/category/${category.id}`}
                                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="overflow-hidden rounded-t-lg ">
                                    <img
                                        src={category.image} // Use category image or fallback to a default image
                                        alt={category.name}
                                        className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-md font-semibold text-gray-800  transition-colors hover:text-lg">
                                        {category.name}
                                    </h3>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No categories found.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Product;
