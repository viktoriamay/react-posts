import { Form } from './../Form/Form';
import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import { useContext, useState } from 'react';
import { PostsContext } from './../../context/PostsContext';
import './AddPostForm.scss';

export const AddPostForm = () => {
  const { addPostRequest } = useContext(PostsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  const [imageSrc, setImageSrc] = useState();

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <>
      <Form
        className="form__modals"
        handleFormSubmit={handleSubmit(addPostRequest)}
        title="Добавьте ваш пост">
        <input
          className="form__input"
          {...register('title', {
            required,
          })}
          type="text"
          name="title"
          placeholder="Заголовок"
          defaultValue={''}
        />
        {errors.title && <span className="form__errors">{errors?.title.message}</span>}

        <textarea
          className="form__textarea"
          {...register('text', {
            required,
          })}
          type="text"
          name="text"
          placeholder="Описание"
          defaultValue={''}
        />
        {errors.text && <span className="form__errors">{errors?.text.message}</span>}
        <input
          className="form__input"
          {...register('tags')}
          type="text"
          name="tags"
          placeholder="Добавьте теги через запятую "
          defaultValue={''}
        />
        <input
          className="form__input"
          {...register('image', {
            required,
          })}
          type="text"
          name="image"
          placeholder="Изображение"
          defaultValue={''}
          onChange={handleImageChange}
        />
        {imageSrc && <img src={imageSrc} alt="add-post-pic" />}
        {errors.image && <span className="form__errors">{errors?.image.message}</span>}
        <button className="form__button" type="submit">
          Добавить пост
        </button>
      </Form>
    </>
  );
};
