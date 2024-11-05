import React from 'react';
import Slider from 'react-slick';
import img1 from '../../assets/4th-01.jpg';
import img3 from '../../assets/mt-1869-gallery-09bg.jpg'; 
import img2 from '../../assets/image-25.png'; 
import "./index.css"

// Left Arrow Component


// Right Arrow Component

const ImageSlider: React.FC = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        pauseOnHover: false,
        
    };

    return (
        <Slider {...settings}>
            <div>
                <img src={img1} alt="Image 1" className="slider-image" style={sliderImageStyle} />
            </div>
            <div>
                <img src={img2} alt="Image 2" className="slider-image" style={sliderImageStyle} />
            </div>
            <div>
                <img src={img3} alt="Image 3" className="slider-image" style={sliderImageStyle} />
            </div>
        </Slider>
    );
};

// Custom styles for the images
const sliderImageStyle: React.CSSProperties = {
    width: '100%',
    height: '45rem',
    objectFit: "cover"
};

export default ImageSlider;
