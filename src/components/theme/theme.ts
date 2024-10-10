// theme.ts

// Define your color palette
const colors = {
    primary: '#003a70',   // Blue
    secondary: 'white', // Green
    accent: '#e74c3c',    // Red
    background: '#ecf0f1', // Light Grey
    textPrimary: '#2c3e50', // Dark Grey
    textSecondary: '#7f8c8d', // Light Grey
};

// Define your font styles
const fonts = {
    primary: 'Montserrat, sans-serif', // Changed to Montserrat
    secondary: 'Georgia, serif',
};

// Define your spacing scale (optional)
const spacing = {
    small: '8px',
    medium: '16px',
    large: '24px',
    xLarge: '32px',
};

// Define your breakpoints for responsive design (optional)
const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
};

// Combine everything into a theme object
const theme = {
    colors,
    fonts,
    spacing,
    breakpoints,
};

export default theme;
