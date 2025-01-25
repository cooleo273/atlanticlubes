import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/ImageSlider/4th-01.jpg";
import img3 from "../../assets/ImageSlider/mt-1869-gallery-09bg.jpg";
import img2 from "../../assets/ImageSlider/image-25.png";
import "./index.css";

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
        <div
          className="w-full h-[20rem] sm:h-[20rem] md:h-[30rem] lg:h-[37rem] xl:h-[60rem] bg-cover bg-center"
          style={{ backgroundImage: `url(${img1})` }}
        ></div>
      </div>
      <div>
        <div
          className="w-full h-[20rem] sm:h-[20rem] md:h-[30rem] lg:h-[37rem] xl:h-[60rem] bg-cover bg-center"
          style={{ backgroundImage: `url(${img2})` }}
        ></div>
      </div>
      <div>
        <div
          className="w-full h-[20rem] sm:h-[20rem] md:h-[30rem] lg:h-[37rem] xl:h-[60rem] bg-cover bg-center"
          style={{ backgroundImage: `url(${img3})` }}
        ></div>
      </div>
    </Slider>
  );
};

export default ImageSlider;
