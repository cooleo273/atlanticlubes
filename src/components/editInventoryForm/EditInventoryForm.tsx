// src/pages/EditInventoryForm/EditInventoryForm.tsx
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../auth/Supabase';

interface InventoryItem {
    inventory_name: string;
    image: string;
    description: string;
    application: string[];
    performance: string[];
    recommendations: string;
    properties: string[];
}

const EditInventoryForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [inventory, setInventory] = useState<InventoryItem>({
        inventory_name: '',
        image: '',
        description: '',
        application: [],
        performance: [],
        recommendations: '',
        properties: [],
    });

    useEffect(() => {
        // Fetch the current inventory item from Supabase
        const fetchInventory = async () => {
            const { data, error } = await supabase
                .from('inventory')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching inventory:', error);
                return;
            }
            setInventory(data);
        };

        fetchInventory();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInventory((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name: string, value: string) => {
        setInventory((prev) => ({
            ...prev,
            [name]: value.split(',').map((item) => item.trim()),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { error } = await supabase
            .from('inventory')
            .update(inventory)
            .eq('id', id);

        if (error) {
            console.error('Error updating inventory:', error);
            alert('Failed to update item');
        } else {
            alert('Inventory item updated successfully!');
            navigate('/inventory'); // Redirect back to inventory list
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Edit Inventory Item</h2>

            <label>Inventory Name:</label>
            <input
                type="text"
                name="inventory_name"
                value={inventory.inventory_name}
                onChange={handleChange}
                required
            />

            <label>Image URL:</label>
            <input
                type="text"
                name="image"
                value={inventory.image}
                onChange={handleChange}
            />

            <label>Description:</label>
            <textarea
                name="description"
                value={inventory.description}
                onChange={handleChange}
            />

            <label>Application (comma-separated):</label>
            <input
                type="text"
                value={inventory.application.join(', ')}
                onChange={(e) => handleArrayChange('application', e.target.value)}
            />

            <label>Performance (comma-separated):</label>
            <input
                type="text"
                value={inventory.performance.join(', ')}
                onChange={(e) => handleArrayChange('performance', e.target.value)}
            />

            <label>Recommendations:</label>
            <textarea
                name="recommendations"
                value={inventory.recommendations}
                onChange={handleChange}
            />

            <label>Properties (comma-separated):</label>
            <input
                type="text"
                value={inventory.properties.join(', ')}
                onChange={(e) => handleArrayChange('properties', e.target.value)}
            />

            <button type="submit">Update Item</button>
        </form>
    );
};

export default EditInventoryForm;
