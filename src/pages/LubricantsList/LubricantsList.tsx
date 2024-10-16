import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; // Import the CSS file

interface InventoryItem {
    id: string;
    inventory_name: string;
    description: string;
    application?: string[];
    performance?: string[];
    recommendations?: string;
    properties?: string[];
    image?: string; // URL or path to the image
}

const LubricantsList: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [formData, setFormData] = useState<Partial<InventoryItem>>({});
    const [imageFile, setImageFile] = useState<File | null>(null); // State for handling image uploads

    // Fetch inventory data on component mount
    useEffect(() => {
        axios.get('https://atlanticlubesbackend.vercel.app/api/inventory')
            .then((response) => setInventory(response.data))
            .catch((error) => console.error('Error fetching inventory:', error));
    }, []);

    // Delete item from inventory
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://atlanticlubesbackend.vercel.app/api/inventory/${id}`);
            alert('Item deleted successfully!');
            setInventory((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Open edit form and populate with item data
    const handleEditClick = (item: InventoryItem) => {
        setEditingItem(item);
        setFormData({
            inventory_name: item.inventory_name,
            description: item.description,
            application: item.application || [],
            performance: item.performance || [],
            recommendations: item.recommendations,
            properties: item.properties || [],
            image: item.image, // Set the current image URL
        });
        setImageFile(null); // Reset the image file input
    };

    // Handle input changes for text fields
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof InventoryItem
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // Handle input changes for fields with comma-separated arrays
    const handleArrayChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof InventoryItem
    ) => {
        const value = e.target.value.split(',').map(item => item.trim());
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
    };

    // Update the item in the inventory
    const handleUpdate = async () => {
        if (editingItem) {
            const formDataToSend = new FormData();
            formDataToSend.append('inventory_name', formData.inventory_name || '');
            formDataToSend.append('description', formData.description || '');
            formDataToSend.append('application', JSON.stringify(formData.application || []));
            formDataToSend.append('performance', JSON.stringify(formData.performance || []));
            formDataToSend.append('recommendations', formData.recommendations || '');
            formDataToSend.append('properties', JSON.stringify(formData.properties || []));

            if (imageFile) {
                formDataToSend.append('photo', imageFile); // Attach the new image file
            }

            try {
                await axios.put(
                    `https://atlanticlubesbackend.vercel.app/api/inventory/${editingItem.id}`,
                    formDataToSend,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Set proper content type for file upload
                        },
                    }
                );

                alert('Item updated successfully!');
                setInventory((prev) =>
                    prev.map((item) =>
                        item.id === editingItem.id ? { ...item, ...formData } : item
                    )
                );
                setEditingItem(null); // Close the edit form
                setImageFile(null); // Reset the image input
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    return (
        <div className='inventory-list'>
            <h1>Lubricants Inventory</h1>

            <ul>
                {inventory.map((item) => (
                    <li key={item.id}>
                        <h4>{item.inventory_name}</h4>
                        <div style={{display:"flex"}}>
                        <button onClick={() => handleEditClick(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingItem && (
                <div className='edit-form'>
                    <h2>Edit Item</h2>
                    <label>Inventory Name</label>
                    <input
                        type="text"
                        value={formData.inventory_name || ''}
                        onChange={(e) => handleInputChange(e, 'inventory_name')}
                        placeholder="Inventory Name"
                    />
                    <label>Description</label>
                    <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange(e, 'description')}
                        placeholder="Description"
                    />
                    <label>Application</label>
                    <input
                        type="text"
                        value={(formData.application || []).join(', ')}
                        onChange={(e) => handleArrayChange(e, 'application')}
                        placeholder="Applications (comma-separated)"
                    />
                    <label>Performance</label>
                    <input
                        type="text"
                        value={(formData.performance || []).join(', ')}
                        onChange={(e) => handleArrayChange(e, 'performance')}
                        placeholder="Performance (comma-separated)"
                    />
                    <label>Recommendation</label>
                    <textarea
                        value={formData.recommendations || ''}
                        onChange={(e) => handleInputChange(e, 'recommendations')}
                        placeholder="Recommendations"
                    />
                    <label>Properties</label>
                    <input
                        type="text"
                        value={(formData.properties || []).join(', ')}
                        onChange={(e) => handleArrayChange(e, 'properties')}
                        placeholder="Properties (comma-separated)"
                    />
                    <label>Images</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default LubricantsList;
