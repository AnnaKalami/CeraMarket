/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { addItem, updateItem } from './ItemsSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface FormUpdateItemProps {
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormUpdateItem: React.FC<FormUpdateItemProps> = ({ setAddPage }) => {
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const user = useSelector((store: RootState) => store.auth.auth);
    const dispatch = useAppDispatch();
    
    const { itemId } = useParams();
    const items = useSelector((store: RootState) => store.items.items);
    
    useEffect(() => {
        const currentItem = itemId && items.find((item) => item.id === +itemId);
        if (currentItem) {
            setDescription(currentItem.description)
            setPrice(currentItem.price)
        }
    }, [itemId, items]);
    
    
    

  return (
    <form 
      className="form-add"
      onSubmit={(e) => {
        if (user?.id &&itemId ){
          e.preventDefault();
          dispatch(updateItem({id:+itemId,  description, price, user_id:user.id})).catch(console.log)
          setAddPage(false);
        }
      }}
    >
      <label className="form-add__label">
        Description
        <input
          className="form-add__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
      </label>
      <label className="form-add__label">
        Price
        <input
          className="form-add__input"
          value={price}
          onChange={(e) => { const inputValue = +e.target.value;
            if (inputValue >= 0) {
              setPrice(inputValue);
            }}}
          type="number"
        />
      </label>
      <button className="form-add__submit" type="submit">
        Изменить  Штуку Дрюку
      </button>
      <button className="form-add__close" onClick={()=> setAddPage(false)}>
        Закрыть окно(можно потом крестик нарисовать)
      </button>
    </form>
  );
};

export default FormUpdateItem;
