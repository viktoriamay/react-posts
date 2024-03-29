import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import './Post.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { VALIDATE_CONFIG } from './../../constants/constants';
import { PostsContext } from './../../context/PostsContext';
import { Modal } from './../Modal/Modal';
import { EditPostForm } from './../EditPostForm/EditPostForm';
import { PagesBackButton } from '../PagesBackButton/PagesBackButton';

export const Post = (props) => {
  const { options, deletePostRequest, activeHeaderModal, setActiveHeaderModal, currentUser } = useContext(PostsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const reviewRegister = register('text', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    minLength: {
      value: 5,
      message: 'Минимум 5 символов',
    },
  });


  // небезопасный способ вставки данных с бэка
  const desctiptionHTML = {
    __html: props?.text?.replace(props?.text[0], props?.text[0].toUpperCase()),
  };
  
  const handleCloseModal = () => {
    setActiveHeaderModal({ ...activeHeaderModal, isOpen: false });
  };

  return (
    <div className="post">
      <div className="post__controls">
        <PagesBackButton />

        <div className="post__edit">
          {currentUser?._id === props?.post?.author?._id && (
            <button
              className="post__edit_icon"
              onClick={() =>
                setActiveHeaderModal({ component: 'editPost', isOpen: true })
              }>
              <FormOutlined />
            </button>
          )}

          {currentUser?._id === props?.post?.author?._id && (
            <button
              className="post__edit_icon"
              onClick={() => deletePostRequest(props.post._id)}>
              <DeleteOutlined />
            </button>
          )}
        </div>
      </div>
      <div className="post__content">
        <div className="post__wrapper">
          <div className="post__intro">
            <div className="post__intro_info">
              <h2 className="post__title">
                {props?.title?.replace(
                  props?.title[0],
                  props?.title[0].toUpperCase(),
                )}
              </h2>
              <hr width="60%" style={{ margin: '1rem auto' }} />
              <span className="post__date">
                {new Date(props?.created_at)
                  .toLocaleString('ru-RU', options)
                  .slice(0, -3)}
              </span>
            </div>
            <Link to={`/user/${props?.post?.author?._id}`} className="post__author">
              <div className="post__author_avatar">
                <div className="post__author_avatar_img_container">
                  <img alt="imag" src={props?.author?.avatar} />
                </div>
                <span>{props?.author?.name}</span>
              </div>
              <span className="post__author_about">{props?.author?.about}</span>
            </Link>
          </div>
          <div className="post__image">
            <img alt="imag" src={props?.image} />
          </div>
        </div>
        <div className="post__description">
          <p
            className="post__text"
            dangerouslySetInnerHTML={desctiptionHTML}></p>
        </div>
        {props?.tags?.length !== 0 && (
          <p className="post__tags">
            {props?.tags?.map((tag) => (
              <span key={props._id + Math.random().toFixed(6)}>#{tag}</span>
            ))}
          </p>
        )}
        <div className="post__likes">
          <div>
            Нравится <span>{props?.likes?.length}</span>
          </div>
          <div
            className={
              props?.isLike ? 'post__like_info_active' : 'post__like_info'
            }
            onClick={(e) => props.onPostLike(e)}>
            {props?.isLike ? 'Удалить лайк' : 'Поставить лайк'}
          </div>
        </div>
        <div className="post__comments">
          <h2>
            Комментарии <span>{props?.comments?.length}</span>
          </h2>
          <div className="post__comments_wrapper">
            {props?.comments
              ?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((e) => (
                <div className="post__comments_author_flex" key={e.created_at}>
                  <div className="post__comments_author">
                    <Link to={`/user/${props?.getUserCommentsInfo(e.author).id}`}  className="post__comments_author_link">
                    <div className="post__comments_author_avatar">

                      <img src={props?.getUserCommentsInfo(e.author).avatar} alt="avatar" />
                    </div>
                      <h3 className="post__comments_author_name">
                        {props?.getUserCommentsInfo(e.author).name}
                      </h3>
                    </Link>
                    <div className="post__comments_author_data">
                      <span className="post__comments_author_date">
                        {new Date(e?.created_at)
                          .toLocaleString('ru-RU', options)
                          .slice(0, -3)}
                      </span>
                      <p className="post__comments_author_text">{e.text}</p>
                    </div>
                  </div>
                  {e.author === currentUser?._id && (
                    <button
                      className="post__edit_icon post__edit_icon_comments"
                      onClick={() => props.deleteCommentRequest(e._id)}>
                      <DeleteOutlined />
                    </button>
                  )}
                </div>
              ))}
          </div>
          <div>
            <h2>Оставьте свой комментарий</h2>
            <Form
              className="post__comments_form"
              handleFormSubmit={handleSubmit(props.sendCommentRequest)}
              title="">
              <textarea
                className="form__textarea"
                {...reviewRegister}
                type="text"
                name="text"
                placeholder="Комментарий"
              />
              {errors.text && (
                <span className="post__comments_errors>">
                  {errors?.text?.message}
                </span>
              )}

              <button className="form__button" type="submit">
                Отправить комментарий
              </button>
            </Form>
          </div>
        </div>
        <div className="modal__container">
          <Modal
            activeHeaderModal={activeHeaderModal.isOpen}
            setActiveHeaderModal={handleCloseModal}>
            {activeHeaderModal.component === 'editPost' && (
              <EditPostForm
                editPostRequest={props.editPostRequest}
                post={props.post}
              />
            )}
          </Modal> 
        </div>
      </div>
    </div>
  );
};