import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './index.css';

const HorizontalImageSlider: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://atlanticlubesbackend.vercel.app/api/images');
                const imageUrls = response.data.map((item: { image: string }) => item.image);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    if (images.length === 0) {
        return <div>Loading...</div>;
    }

    // Handle the hover event to pause the animation
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Handle next and previous buttons
    const scrollSlider = (direction: string) => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'next' ? 300 : -300; // Adjust the scroll amount as needed
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div
            className="logos"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={sliderRef}
                className={`logos-slide ${isHovered ? 'paused' : ''}`}
            >
                {images.map((image, index) => (
                    <img key={`first-${index}`} src={image} alt={`Slide ${index + 1}`} className="slider-image" />
                ))}
            </div>
            <div
                ref={sliderRef}
                className={`logos-slide ${isHovered ? 'paused' : ''}`}
            >
                {images.map((image, index) => (
                    <img key={`second-${index}`} src={image} alt={`Slide ${index + 1}`} className="slider-image" />
                ))}
            </div>

            <div className="slick-arrow prev-arrow" onClick={() => scrollSlider('prev')}>
                &#8592;
            </div>
            <div className="slick-arrow next-arrow" onClick={() => scrollSlider('next')}>
                &#8594;
            </div>
        </div>
    );
};

export default HorizontalImageSlider;
