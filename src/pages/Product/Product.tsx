import React from 'react';
import ImageWithTitle from '../../components/Imagewithtitle/Imagewithtitle'; // Adjust the path as needed
import yourImage from '../../assets/whatsapp-image-2023-03-31-at-10.51.07.jpeg'; // Update with your image path
import "./index.css"

const Product: React.FC = () => {
    return (
        <div style={containerStyle}>
            <img src={yourImage} style={{width:"100%", height:"30rem", objectFit:"cover" }} className='image'/>
            
           
            <input 
                type="text" 
                placeholder="Search for a plan..." 
                style={searchInputStyle} 
            />
            <a href="/lubricants">
             <div style={gridStyle}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <ImageWithTitle 
                        
                        title='Automotive Lubricants' 
                        image={yourImage} 
                    />
                ))}
            </div>
            </a>
        </div>
    );
};

// Custom styles
const containerStyle: React.CSSProperties = {
    textAlign: 'center',
    
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Adjust the min width as needed
    gap: '1rem', // Space between grid items
    padding: '5rem', //
};

const searchInputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '1rem',
    width: '80%', // Adjust the width as needed
    maxWidth: '400px', // Maximum width for the search input
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '3rem',
};

export default Product;
