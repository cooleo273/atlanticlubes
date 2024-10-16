// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './pages/Home/Home';
import About from './pages/About/about';
import Contact from './pages/contact/contact';
import Product from './pages/Product/Product';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lubricants from './pages/Lubricants/Lubricants';
import InventoryDetail from './pages/InventoryDetail/InventoryDetails';

import VerifyEmail from './components/auth/VerifyEmail';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './components/sidebar/Sidebar';

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ display: "flex", overflowX: "hidden", flexDirection: "column" }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products" element={<Product />} />
                    
                    <Route path="/category/:id" element={<Lubricants />} />
                    <Route path="/inventory/:id" element={<InventoryDetail />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Inventory Route with Sidebar */}
                    <Route
                        path="/inventory"
                        element={
                            <ProtectedRoute>
                                <div style={{ display: "flex" }}>
                                    <Sidebar />
                                </div>
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/verify" element={<VerifyEmail />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
