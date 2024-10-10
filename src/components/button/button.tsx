import React from 'react';
import theme from '../theme/theme';

interface ButtonProps {
    label: string;
    variant?: 'black' | 'white'; // Optional prop to switch between styles
}

const Button: React.FC<ButtonProps> = ({ label, variant = 'black' }) => {
    // Define styles based on the variant
    const buttonStyle = variant === 'black' ? {
        backgroundColor: 'black',
        color: 'white',
        border: '2px solid white',
    } : {
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid black',
    };

    return (
        <button style={{
            ...buttonStyle,
            padding: `${theme.spacing.medium} ${theme.spacing.large}`,
            borderRadius: '4px',
            fontFamily: theme.fonts.primary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <span>{label}</span>
        </button>
    );
};

export default Button;
