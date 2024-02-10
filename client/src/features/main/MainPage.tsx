import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import MainSwiper from './MainSwiper';
import 'swiper/css'
import 'swiper/css/autoplay'
const MainPage = (): JSX.Element => {
  const allItems = useSelector((store: RootState) => store.items.items)
  const allImages = [...allItems].map((item)=> item.ItemGallery.ItemImages).flat()
  // console.log(allItems);
  
  
  return (
    <div className='container-images'>
      <MainSwiper allImages={allImages}/>
    </div>
  );
};

export default MainPage;
