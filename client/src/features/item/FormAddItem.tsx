/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { CSSProperties, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { addItem } from './ItemsSlice';
import { useSelector } from 'react-redux';

interface FormAddItemProps {
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAddItem: React.FC<FormAddItemProps> = ({ setAddPage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<FileList | null>(null); 
  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();

  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const handleMouseDown = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    const startX = e.pageX - position.x;
    const startY = e.pageY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.pageX - startX,
        y: e.pageY - startY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const modalStyle: CSSProperties = {
    position: 'absolute',
    top: position.y + 'px',
    left: position.x + 'px',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
    }
  };

  return (
    <form
      style={modalStyle}
      onMouseDown={handleMouseDown}
      className="form-add"
      onSubmit={(e) => {
        if (user?.id) {
          e.preventDefault();
          const formData = new FormData();
          formData.append('name', name);
          formData.append('description', description);
          formData.append('price', String(price));
          if (images) {
            Array.from(images).forEach((image) => {
              formData.append('images', image);
            });
          }
          dispatch(addItem(formData)).catch(console.log)
          setName('')
          setDescription('');
          setPrice(0);
          setImages(null);
          setAddPage(false);
        }
      }}
    >
      <label className="form-add__label">
        Name
        <input
          className="form-add__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
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
          onChange={(e) => {
            const inputValue = +e.target.value;
            if (inputValue >= 0) {
              setPrice(inputValue);
            }
          }}
          type="number"
        />
      </label>
      <label className="form-add__label">
        Images
        <input
          className="form-add__input"
          onChange={(e) => handleFileChange(e)}
          type="file"
          multiple
        />
      </label>
      <button className="form-add__submit" type="submit">
        Добавить Штуку Дрюку
      </button>
      <button className="form-add__close" onClick={() => setAddPage(false)}>
        Закрыть окно(можно потом крестик нарисовать)
      </button>
    </form>
  );
};

export default FormAddItem;
