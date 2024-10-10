import React from "react";
import './index.css'; // Import the CSS file

interface CardProps {
    title?: string;
    description: string;
    addBorder?: boolean;
    titleColor?: string; // Optional prop for text color styling
    titleBackgroundColor?: string; // Optional prop for border styling
    isRow?: boolean; // New prop to control flex-direction
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    titleBackgroundColor,
    titleColor,
    addBorder = false, // Default to no border
    isRow = false, // Default to column by default
}) => {
    return (
        <div className={`container ${addBorder ? 'border' : ''}`}>
            <div
                className={`text-container-card ${isRow ? 'row-layout' : 'column-layout'}`} // Use className for responsive layout
                style={{
                    backgroundColor: titleBackgroundColor || "transparent",
                    color: titleColor || "black",
                }}
            >
                {title && <h4 className="title">{title}</h4>}
                <p className="description-card">{description}</p>
            </div>
        </div>
    );
};

export default Card;
