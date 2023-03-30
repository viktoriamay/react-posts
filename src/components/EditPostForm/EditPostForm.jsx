import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from '../../constants/constants';
import { useState } from 'react';
import './EditPostForm.scss';

export const EditPostForm = ({ editPostRequest, post, headerCloseModal }) => {
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
      className="edit_post_form">
      <input
        className="edit_post_form__input"
        {...register('title', {
          required,
        })}
        type="text"
        name="title"
        placeholder="Заголовок"
        defaultValue={post?.title}
      />
      {errors.title && (
        <span className="edit_post_form_">{errors?.title.message}</span>
      )}

      <textarea
        className="edit_post_form__textarea"
        {...register('text', {
          required,
        })}
        type="text"
        name="text"
        placeholder="Текст"
        defaultValue={post?.text}
      />
      {errors.text && <span>{errors?.text.message}</span>}
      <input
        className="edit_post_form__input"
        {...register('tags', {
          required,
        })}
        type="text"
        name="tags"
        placeholder="Теги"
        defaultValue={post?.tags}
      />
      <input
        className="edit_post_form__input"
        {...register('image', {
          required,
        })}
        type="text"
        name="image"
        placeholder="Изображение"
        defaultValue={post?.image}
        onChange={handleImageChange}
      />
      {errors.image && <span>{errors?.image.message}</span>}

      <div className="edit_post_form__image">
        <img src={imageSrc || post?.image} alt="post-pic" />
      </div>
      <button className="edit_post_form__button" type="submit">
        Сохранить изменения
      </button>
    </Form>
  );
};
