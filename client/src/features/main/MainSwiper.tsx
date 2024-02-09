import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import  { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ItemImage } from '../item/types';

const MainSwiper = ({ allImages}:{allImages:ItemImage[]}) => {



  return (
    <Swiper
    className="sample-slider"
        modules={[Autoplay]}
        effect='coverflow'
        grabCursor = {true}
        centeredSlides = {true}
        slidesPerView={2}
        loop={true} 
        coverflowEffect={{
            rotate:0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: true,
        }}
        autoplay={{ delay: 0,
            pauseOnMouseEnter: true,    
            disableOnInteraction: false, 
        }} 
      speed={3000}
    >
      {allImages.map((image:ItemImage) => (
        <SwiperSlide key={image.id}>
          <img className='main-slider-image' src={image.path} alt={`Image ${image.id}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSwiper;