import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './pages/Home/Home';
import About from './pages/About/about';
import Contact from './pages/contact/contact';
import Product from './pages/Product/Product';
import Blog from './pages/Blog/blog';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lubricants from './pages/Lubricants/Lubricants';


const App: React.FC = () => {
    return (
        <Router>
            <div style={{overflowX: "hidden"}}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/lubricants" element={<Lubricants />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
