import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HorizontalImageSlider: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://shimerolbackend.vercel.app/api/images');
                const imageUrls = response.data.map((item: { image: string }) => item.image);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    if (images.length === 0) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="slider bg-white h-[100px] overflow-hidden relative">
            {/* Gradient Overlay - Left */}
            <div className="absolute left-0 top-0 z-10 h-full w-[200px] bg-gradient-to-r from-white to-transparent" />
            
            {/* Gradient Overlay - Right */}
            <div className="absolute right-0 top-0 z-10 h-full w-[200px] bg-gradient-to-l from-white to-transparent" />
            
            {/* Sliding Track */}
            <div className="slide-track flex animate-infiniteScroll">
                {/* First Set */}
                {images.map((image, index) => (
                    <div key={`slide-${index}`} className="slide w-[250px] h-[100px] flex items-center justify-center">
                        <img 
                            src={image} 
                            alt={`Slide ${index + 1}`}
                            className="h-[100px] w-[250px] object-contain"
                        />
                    </div>
                ))}
                {/* Duplicate Set for seamless loop */}
                {images.map((image, index) => (
                    <div key={`slide-duplicate-${index}`} className="slide w-[250px] h-[100px] flex items-center justify-center">
                        <img 
                            src={image} 
                            alt={`Slide ${index + 1}`}
                            className="h-[100px] w-[250px] object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalImageSlider;