import React from "react";
import './index.css'; // Import CSS for styling

// Define the props interface
interface BodyContainerProps {
    image?: string; // Make image optional
    title?: string;
    description: string;
    reverse?: boolean; // Optional prop to control row-reverse
    buttonText?: string; // Optional button text
    onButtonClick?: () => void; // Optional button click handler
    buttonVariant?: "black" | "white"; // Prop to control button style
    addBorder?: boolean; // Optional prop for border styling
    backgroundColor?: string; // Optional prop for background color
    titleColor?: string; // Optional prop for title color
    titleBackgroundColor?: string; // Optional prop for title background color
    descriptionColor?: string; // Optional prop for description color
    title2?: string; // Optional second title
    description2?: string; // Optional second description
}

// Define the BodyContainer component
const BodyContainer: React.FC<BodyContainerProps> = ({
    image,
    title,
    description,
    reverse = false,
    buttonText,
    onButtonClick,
    buttonVariant = "black",
    addBorder = false,
    backgroundColor,
    titleColor,
    titleBackgroundColor,
    descriptionColor,
    title2, // Second title
    description2, // Second description
}) => {
    return (
        <div
            className={`container ${addBorder ? 'border' : ''} ${reverse ? 'reverse' : ''}`} 
            style={{
                backgroundColor: backgroundColor || "transparent",
            }}
        >
            {image && (
                <div
                    className="flex-1 bg-cover bg-center h-[35rem]"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}
            <div className="text-container">
                <h2
                    className="title-header"
                    style={{
                        color: titleColor || "inherit",
                        backgroundColor: titleBackgroundColor || "transparent",
                    }}
                >
                    {title}
                </h2>
                <p className="text-md text-gray-600">
                    {description}
                </p>

                {/* Conditionally render the second title and description */}
                {title2 && (
                    <h2
                        className="title-header"
                        style={{
                            color: titleColor || "inherit",
                            backgroundColor: titleBackgroundColor || "transparent",
                        }}
                    >
                        {title2}
                    </h2>
                )}
                {description2 && (
                    <p className="text-md text-gray-600">
                        {description2}
                    </p>
                )}

                {buttonText && onButtonClick && (
                    <button
                        className={buttonVariant === "black" ? 'black-button' : 'white-button'}
                        onClick={onButtonClick}
                    >
                        {buttonText}
                        <span
                            className="arrow"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default BodyContainer;
