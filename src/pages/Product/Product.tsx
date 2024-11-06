import React, { useEffect, useState } from 'react';
import yourImage from '../../assets/whatsapp-image-2023-03-31-at-10.51.07.jpeg'; // Optional default image
import img from '../../assets/mt-1869-gallery-09bg.jpg';
import { ClipLoader } from 'react-spinners';

interface Category {
    id: number;
    name: string;
    description?: string;
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

    // Filter categories based on the search query
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center">
            {/* Background Image */}
            <img
                src={img}
                alt="Background"
                className="w-full h-80 object-cover mb-8"
            />

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
                {loading ? (
                    <div className='flex items-center justify-center w-full'>
                    <ClipLoader size={30}/>
                    </div>
                ) : error ? (
                    <p className="text-center col-span-full text-red-500">{error}</p>
                ) : (
                    filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <a
                                key={category.id}
                                href={`/category/${category.id}`}
                                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  hover:bg-black"
                            >
                                <div className="overflow-hidden rounded-t-lg ">
                                    <img
                                        src={yourImage}
                                        alt={category.name}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 hover:opacity-70"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-md font-semibold text-gray-800 group-hover:text-white transition-colors hover:text-lg">
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
