import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import 'swiper/css'
import 'swiper/css/autoplay'
import ItemItem from '../item/ItemItem';
import { useParams } from 'react-router-dom';
const ItemsFromOneMasterListPage = (): JSX.Element => {
  const [priceSort, setPriceSort] = useState(0)
  const [tag,setTag] = useState('')
  const {masterId}= useParams()
//   const allItems = useSelector((store: RootState) => store.items.items)
//   const allImages = [...allItems].map((item)=> item.ItemGallery.ItemImages).flat()
let  items  = [...useSelector((store: RootState) => store.items.items)]
  if (masterId){
    items = items.filter((item)=> item.user_id===+masterId)
  }
  if(priceSort===1) {
    items.sort((a,b)=> b.price-a.price)
  }
  if(priceSort===2) {
    items.sort((a,b)=> a.price-b.price)
  }
  if(priceSort===3) {
    items.sort((a,b)=> a.description.localeCompare(b.description))
  }
  if(priceSort===4) {
    items.sort((a,b)=> b.description.localeCompare(a.description))
  }

  items = items.filter((item) =>
  item.description.toLowerCase().includes(tag.toLowerCase())
)

const  clearFilters = ()=> {
  setTag('')
  setPriceSort(0)
}
  return (
    <>
    {[0,1,2,3,4].includes(priceSort)&&(
      <input  value={tag} onChange={(e) => {setTag(e.target.value);
      }}/>
    )}
    {[0,2,3,4,5].includes(priceSort)&&(  
      <button onClick={()=> setPriceSort(1)}>По цене ↓</button>
    )}
    {[1].includes(priceSort)&&(
      <button onClick={()=> setPriceSort(2)}>По цене ↑</button>
    )}
    {[0,1,2,4,5].includes(priceSort)&&(
      <button onClick={()=> setPriceSort(3)}>По алфавиту Я-А</button>
    )}
    {[3].includes(priceSort)&&(
      <button onClick={()=> setPriceSort(4)}>По алфавиту А-Я</button>
    )}
    
      <button onClick={()=> clearFilters()}>Сбросить фильтры</button>
    
    <div className="item-page__container">
    {items.map((item) => (
      <ItemItem key={item.id} item={item} />
    ))}
  </div>
  </>
  );
};

export default ItemsFromOneMasterListPage;
