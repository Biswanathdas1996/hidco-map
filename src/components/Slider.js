import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import IMG1 from "../assets/zoo/1.jpg";
import IMG2 from "../assets/zoo/2.jpg";
import IMG3 from "../assets/zoo/3.jpg";
import IMG4 from "../assets/zoo/4.jpg";

const ImageSlider = () => {
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      autoPlay={true}
      swipeable={true}
    >
      <div>
        <img src={IMG1} alt="Images 1" style={{ height: 300 }} />
        {/* <p className="legend">Image 1</p> */}
      </div>
      <div>
        <img src={IMG2} alt="Images 2" style={{ height: 300 }} />
        {/* <p className="legend">Image 2</p> */}
      </div>
      <div>
        <img src={IMG3} alt="Images 3" style={{ height: 300 }} />
        {/* <p className="legend">Image 3</p> */}
      </div>
      <div>
        <img src={IMG4} alt="Images 3" style={{ height: 300 }} />
        {/* <p className="legend">Image 3</p> */}
      </div>
    </Carousel>
  );
};

export default ImageSlider;
