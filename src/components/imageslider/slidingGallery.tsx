import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HorizontalImageSlider: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://atlanticlubesbackend.vercel.app/api/images');
                const imageUrls = response.data.map((item: { image: string }) => item.image);
                setImages(imageUrls);
                console.log(imageUrls)
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const duplicatedImages = [...images, ...images];

    const sliderContainerStyle: React.CSSProperties = {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        background: "white",
        marginTop: "2rem"
    };

    const sliderStyle: React.CSSProperties = {
        display: 'flex',
        animation: `scroll 30s linear infinite`,
    };

    const imageStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
        objectFit: "contain",
        marginRight: '5rem',
    };

    const styles = `
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${images.length * 105}px); } /* Adjust based on image width */
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return (
        <div style={sliderContainerStyle}>
            <div style={sliderStyle}>
                {duplicatedImages.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index + 1}`} style={imageStyle} />
                ))}
            </div>
        </div>
    );
};

export default HorizontalImageSlider;
