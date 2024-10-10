// ImageWithTitle.tsx
import React from 'react';

interface ImageWithTitleProps {
    image: string; // URL/path of the image
    title: string; // Title to display
    style?: React.CSSProperties; // Optional custom styles for the container
}

const ImageWithTitle: React.FC<ImageWithTitleProps> = ({ image, title, style }) => {
    return (
        <div style={{ textAlign: 'center', ...style }}>
            <img src={image} alt={title} style={imageStyle} />
            <h3 style={titleStyle}>{title}</h3>
        </div>
    );
};

// Custom styles
const imageStyle: React.CSSProperties = {
    maxWidth: '15rem',
    height: '15rem',
    objectFit:"cover",
    borderRadius:"1rem"
};

const titleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: '600',
};

export default ImageWithTitle;
