// src/components/sidebar/Sidebar.tsx
import React, { useState } from 'react';
import './index.css'; // Updated CSS file for responsive styles

import LubricantsList from '../../pages/LubricantsList/LubricantsList';
import AddInventory from '../../pages/InventoryDetailForm/InventoryDetailForm';
import AddCategoryForm from '../../pages/AddCategoryForm/AddCategoryForm';
import EditCategoryForm from '../../components/editInventoryForm/EditICategoryForm'; // Import EditCategoryForm

const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'list' | 'category' | 'editCategory'>('add'); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

    // Toggle sidebar open/close
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); 

    return (
        <div className="inventory-management">
            {/* Mobile Menu Button */}
            <button className="menu-button" onClick={toggleSidebar}>
                {isSidebarOpen ? '✕' : '☰'} {/* Switch between hamburger and X icon */}
            </button>

            {/* Sidebar Section */}
            <div className={`sidebarn ${isSidebarOpen ? 'open' : ''}`}>
                <h3>Inventory Management</h3>
                <ul>
                    <li>
                        <button
                            className={activeTab === 'add' ? 'active-link' : ''}
                            onClick={() => {
                                setActiveTab('add');
                                setIsSidebarOpen(false); // Close sidebar after clicking
                            }}
                        >
                            Add Item
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeTab === 'list' ? 'active-link' : ''}
                            onClick={() => {
                                setActiveTab('list');
                                setIsSidebarOpen(false); // Close sidebar after clicking
                            }}
                        >
                            Inventory List
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeTab === 'category' ? 'active-link' : ''}
                            onClick={() => {
                                setActiveTab('category');
                                setIsSidebarOpen(false); // Close sidebar after clicking
                            }}
                        >
                            Add Category
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeTab === 'editCategory' ? 'active-link' : ''}
                            onClick={() => {
                                setActiveTab('editCategory');
                                setIsSidebarOpen(false); // Close sidebar after clicking
                            }}
                        >
                            Edit Category
                        </button>
                    </li>
                </ul>
            </div>

            {/* Content Section */}
            <div className="content">
                {activeTab === 'add' && <AddInventory />}
                {activeTab === 'list' && <LubricantsList />}
                {activeTab === 'category' && <AddCategoryForm />}
                {activeTab === 'editCategory' && <EditCategoryForm />} {/* New Tab for Editing */}
            </div>
        </div>
    );
};

export default Sidebar;
