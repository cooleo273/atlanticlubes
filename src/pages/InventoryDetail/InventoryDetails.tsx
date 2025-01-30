import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

interface InventoryItem {
  inventory_name: string;
  image: string;
  description: string;
  recommendations: string[] | null;
  application: string | null;
  performance: string[] | null;
  tdsFile: string | null;
  msdsFile: string | null;
}

const InventoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [itemData, setItemData] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        const response = await fetch(`https://shimerolbackend.vercel.app/api/inventory/${id}`);
        if (!response.ok) throw new Error('Error fetching item details');
        const data = await response.json();
        setItemData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <ClipLoader size={50} color="#007bff" />
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!itemData) return <div className="text-center">No item data found</div>;

  return (
    <div className="bg-white text-left min-h-screen">
      <div className={`flex`}>
        <div className="inventory-detail-container w-full px-4 md:px-8 py-4">
          <div className="flex flex-col overflow-hidden bg-white ">
            <img src={itemData.image} alt={itemData.inventory_name} className="w-full h-64 md:h-80 object-contain" />
            <div className='inventory-info px-4 flex justify-center py-12'>
              <div className="w-3/4">
                <h1 className="text-2xl font-bold text-gray-800">{itemData.inventory_name}</h1>
                <p className="text-gray-600 mt-2">{itemData.description}</p>
                <h1 className="text-2xl font-bold text-gray-800">APPLICATIONS</h1>
                <p className="text-gray-600 mt-2">{itemData.application}</p>
                <div className='flex'>
                  <div className='flex-1'>
                {renderStyledList('Performance', itemData.performance)}
                </div>
                <div className='flex-1'>
                {renderStyledList("Recommendations", itemData.recommendations)}
                </div>
                </div>
                {/* Buttons for TDS and MSDS */}
                <div className="flex gap-4 mt-16 justify-end">
                  
                  {itemData.tdsFile && (
                    <button
                      onClick={() => itemData.tdsFile && window.open(itemData.tdsFile, '_blank')}
                      className="px-10 py-4 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border"
                    >
                      View TDS
                    </button>
                  )}
                  {itemData.msdsFile && (
                    <button
                      onClick={() => itemData.msdsFile && window.open(itemData.msdsFile, '_blank')}
                      className="px-10 py-4 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border"
                    >
                      View MSDS
                    </button>
                  )}
                </div>
              </div>
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
    <h2 className="text-lg font-semibold text-gray-800 pb-2 mb-2">{title}</h2>
    {Array.isArray(items) && items.length > 0 ? (
      <ul className="list-none text-gray-600 space-y-1">
        {items.map((item, index) => (
          <li key={index} className=" py-2 rounded-md transition duration-200">
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
