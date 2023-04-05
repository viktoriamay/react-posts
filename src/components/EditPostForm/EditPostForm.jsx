import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from '../../constants/constants';
import { useState } from 'react';
import './EditPostForm.scss';

export const EditPostForm = ({ editPostRequest, post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const required = {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  };

  const [imageSrc, setImageSrc] = useState(post?.image); // изображение из инпута

  function handleImageChange(event) {
    setImageSrc(event.target.value); // достаем изображение вводимое в инпут
  }

  return (
    <Form
      handleFormSubmit={handleSubmit(editPostRequest)}
      title="Изменить пост"
      className="form__modals">
      <input
        className="form__input"
        {...register('title', {
          required,
        })}
        type="text"
        name="title"
        placeholder="Заголовок"
        defaultValue={post?.title}
      />
      {errors.title && (
        <span className="form__errors">{errors?.title.message}</span>
      )}

      <textarea
        className="form__textarea"
        {...register('text', {
          required,
        })}
        type="text"
        name="text"
        placeholder="Текст"
        defaultValue={post?.text}
      />
      {errors.text && (
        <span className="form__errors">{errors?.text.message}</span>
      )}
      <input
        className="form__input"
        {...register('tags', {
          required,
        })}
        type="text"
        name="tags"
        placeholder="Добавьте теги через запятую"
        defaultValue={post?.tags}
      />
      <input
        className="form__input"
        {...register('image', {
          required,
        })}
        type="text"
        name="image"
        placeholder="Изображение"
        defaultValue={post?.image}
        onChange={handleImageChange}
      />
      {errors.image && (
        <span className="form__errors">{errors?.image.message}</span>
      )}

      <div className="edit_post_form__image">
        <img src={imageSrc || post?.image} alt="post-pic" />
      </div>
      <button className="form__button" type="submit">
        Сохранить изменения
      </button>
    </Form>
  );
};
