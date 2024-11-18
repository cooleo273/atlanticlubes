import React from 'react';
import img1 from '../../assets/SlidingGallery/kisspng-volvo-cars-ab-volvo-subaru-automobilbau-aut-tech-group-5b6fcd064f8111.1990852515340536383257.png';
import img2 from '../../assets/SlidingGallery/6c51218a97e0db72e3fd5be461478816.png';
import img3 from '../../assets/SlidingGallery/CAT-logo.png';
import img4 from '../../assets/SlidingGallery/Mercedes-Benz_logo_2.svg.png';
import img5 from '../../assets/SlidingGallery/Porsche_(5).png';
import img6 from '../../assets/SlidingGallery/Renault_2021_Text.svg.png';
import img7 from '../../assets/SlidingGallery/Superbrands-2022.jpg';
import img8 from '../../assets/SlidingGallery/dexos1-gen2.png';
import img9 from '../../assets/SlidingGallery/man logo.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const HorizontalImageSlider: React.FC = () => {
    const duplicatedImages = [...images, ...images]; // Duplicate images for continuous scroll

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

// Custom styles
const sliderContainerStyle: React.CSSProperties = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    background: "white",
    marginTop: "2rem"
};

const sliderStyle: React.CSSProperties = {
    display: 'flex', // Use flexbox to manage alignment
    animation: 'scroll 30s linear infinite',
};

const imageStyle: React.CSSProperties = {
    width: '100px', // Adjust size as needed
    height: '100px',
    objectFit: "contain",
    marginRight: '5rem',
};

// Add keyframes for scrolling effect
const styles = `
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-${images.length * 105}px); } /* Adjust based on image width */
}
`;

// Append styles to the head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default HorizontalImageSlider;
