import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import MainSwiper from './MainSwiper';
import 'swiper/css'
import 'swiper/css/autoplay'
import ItemItem from '../item/ItemItem';
const MainPage = (): JSX.Element => {
  const allItems = useSelector((store: RootState) => store.items.items)
  const allImages = [...allItems].map((item)=> item.ItemGallery.ItemImages).flat()
  // console.log(allItems);
  const items = useSelector((store: RootState) => store.items.items);
  
  return (
    <>
    <div className='container-images'>
      <MainSwiper allImages={allImages}/>
    </div>
    <div className="item-page__container">
    {items.map((item) => (
      <ItemItem key={item.id} item={item} />
    ))}
  </div>
  </>
  );
};

export default MainPage;
