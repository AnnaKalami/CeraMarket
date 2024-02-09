import React from 'react';
import { Swiper, SwiperSlide, } from 'swiper/react'
import  { Autoplay } from 'swiper';
import 'swiper/css'
import 'swiper/css/autoplay'
// import { Autoplay } from 'swiper'
import { ItemImage } from '../item/types';

export default function SampleSlider({ allImages}:{allImages:ItemImage[]}) {
    return (
        <Swiper
        className="sample-slider"
            modules={[Autoplay]}
            loop={true}
            autoplay={{
                delay:0,
                pauseOnMouseEnter: false,    
                disableOnInteraction: false, 
            }}
            slidesPerView={3}         
            speed={3000}         
        >
           {allImages.map((image:ItemImage) => (
            <SwiperSlide key={image.id}>
          <img className='main-slider-image' src={image.path} alt={`Image ${image.id}`} />
            </SwiperSlide>
      ))}
    </Swiper>
    )
}