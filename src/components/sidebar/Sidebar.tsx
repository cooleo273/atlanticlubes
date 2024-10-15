// src/components/sidebar/Sidebar.tsx
import React, { useState } from 'react';

import './index.css'; // Optional CSS styles

import LubricantsList from '../../pages/LubricantsList/LubricantsList';
import AddInventory from '../../pages/InventoryDetailForm/InventoryDetailForm';

const   Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'list'>('add'); // Manage which tab is active

    return (
        <div className="inventory-management">
            <div className="sidebarn">
                <h3 style={{fontWeight:"800"}}>Inventory Management</h3>
                <ul>
                    <li>
                        <button 
                            className={activeTab === 'add' ? 'active-link' : ''}
                            onClick={() => setActiveTab('add')}
                            
                        >
                            Add Item
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeTab === 'list' ? 'active-link' : ''}
                            onClick={() => setActiveTab('list')}
                        >
                            Inventory List
                        </button>
                    </li>
                </ul>
            </div>

            <div className="content">
                {activeTab === 'add' ? <AddInventory /> : <LubricantsList />}
            </div>
        </div>
    );
};

export default Sidebar;
