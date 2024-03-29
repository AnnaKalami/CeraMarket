import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { updateItem } from './ItemsSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './styles/formadd.scss';
interface FormUpdateItemProps {
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormUpdateItem: React.FC<FormUpdateItemProps> = ({ setAddPage }) => {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [selectedImages, setSelectedImages] = useState<number[]>([]); //
  console.log(selectedImages);

  const handleImageClick = (imageId: number) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageId)) {
        return prevSelectedImages.filter((id) => id !== imageId); // Убираем из массива, если уже выбрано
      } else {
        return [...prevSelectedImages, imageId]; // Добавляем в массив, если еще не выбрано
      }
    });
  };

  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();

  const { itemId } = useParams();
  const items = useSelector((store: RootState) => store.items.items);

  const currentItem = itemId && items.find((item) => item.id === +itemId);
  useEffect(() => {
    if (currentItem) {
      setDescription(currentItem.description);
      setPrice(currentItem.price);
      setName(currentItem.name);
    }
  }, [itemId, items]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.id && itemId) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('name', name);
      formData.append('price', String(price));
      formData.append('itemId', String([itemId]));
      selectedImages.forEach((imageId) => {
        formData.append('imgIds', String(imageId)); // Добавляем в formData только выбранные изображения
      });
      if (images) {
        Array.from(images).forEach((image) => {
          formData.append('img', image);
        });
      }

      dispatch(updateItem(formData)).catch(console.log);
      setAddPage(false);
    }
  };

  return (
    <form className="form-add" onSubmit={handleSubmit}>
      <label className="form-add__label">
        Название
        <input
          className="form-add__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <label className="form-add__label">
        Описание
        <input
          className="form-add__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
      </label>
      <label className="form-add__label">
        Цена
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
        Изменить фото
        <div>
          {currentItem &&
            currentItem.ItemGallery.ItemImages.map((image) => (
              <button
              
                key={image.id}
                style={{
                  background: `url(${image.path})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  height: '50px',
                  width: '50px',
                  cursor:'pointer'
                }}
                className={selectedImages.includes(image.id) ? 'selected-image' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleImageClick(image.id);
                }}
              />
            ))}
        </div>
        <input className="form-add__input " onChange={handleFileChange} type="file" multiple />
      </label>
      <button className="form-add__submit add-button-submit" type="submit">
        ПОдтвердить
      </button>
      <button className="form-add__close add-button-submit" onClick={() => setAddPage(false)}>
        Отменить
      </button>
    </form>
  );
};

export default FormUpdateItem;
