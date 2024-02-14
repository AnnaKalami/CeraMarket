/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { addTask } from './TasksSlise';

interface FormAddItemProps {
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAddTask: React.FC<FormAddItemProps> = ({ setAddPage }) => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<FileList | null>(null); 
  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
    }
  };

  return (
    <form
      className="form-add"
      onSubmit={(e) => {
        if (user?.id) {
          e.preventDefault();
          const formData = new FormData();
          formData.append('description', description);
          formData.append('price', String(price));
          if (images) {
            Array.from(images).forEach((image) => {
              formData.append('images', image);
            });
          }
          dispatch(addTask(formData)).catch(console.log)
          
          setDescription('');
          setPrice(0);
          setImages(null);
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
        Добавить Задание Свинание
      </button>
      <button className="form-add__close" onClick={()=> setAddPage(false)}>
        Закрыть окно(будет крестик но это не точно)
      </button>
    </form>
  );
};

export default FormAddTask;
