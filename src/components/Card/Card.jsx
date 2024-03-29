import {
  CommentOutlined,
  DeleteOutlined,
  FireOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Card.scss';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from './../../context/PostsContext';

export const Card = (props) => {
  const {
    deletePostRequest,
    currentUser,
    handlePostLike,
  } = useContext(PostsContext);

  const [classActiveCard, setClassActiveCard] = useState(false);
  const [classHoverCard, setClassHoverCard] = useState(false);

  const handleLikeClick = () => {
    // пробрасываем айди поста и массив лайков этого поста, в апе он принимает значение пост и именно поэтому здесь нам нужно передать параметры объектом
    handlePostLike({ _id: props?._id, likes: props?.likes });
  };
  // если в карточке товара, в массиве лайков (в нашем случае мы ищем в этом массиве id (id === айди пользователя)) есть айди который равен каррентЮзер._айди, значит этот пост отлайкан
  // для изменения внешнего вида кнопки (залайкано / не залайкано)
  const liked = props?.likes?.some((id) => id === currentUser?._id);

  return (
    <div className="card">
      <Link
        to={`/post/${props?._id}`}
        className={'card__wrapper'}
        onMouseDown={() => setClassActiveCard(true)}
        onMouseUp={() => setClassActiveCard(false)}
        onMouseOver={() => setClassHoverCard(true)}
        onMouseOut={() => setClassHoverCard(false)}>
        <div className="card__img_container">
          <img className="card__img" src={props?.image} alt="desc" />
        </div>
        <div className="card__description">
          <div className="card__info">
            <span className="card__info_about">
              <UserOutlined />
              {props?.author?.name}
            </span>
            <span className="card__info_about">
              <CommentOutlined />
              {props?.comments?.length}
            </span>
          </div>
          <h2 className="card__title">
            {props?.title?.replace(
              props?.title[0],
              props?.title[0].toUpperCase(),
            )}
          </h2>
          <p className="card__text">
            {props?.text?.replaceAll(/<\/?[A-Za-z]+[^>]*>/gi, '')
              .slice(0, 50)
              .replace(props?.text[0], props?.text[0].toUpperCase())}
            {props.text?.length > 40 && '...'}
          </p>
          <div className="card__info">
            <span
              className={
                classActiveCard
                  ? 'card__link_more card__link__more_active'
                  : 'card__link_more' && classHoverCard
                  ? 'card__link_more card__link__more_hover'
                  : 'card__link_more'
              }>
              Читать
              <RightOutlined />
            </span>
          </div>
        </div>
      </Link>
      {currentUser?._id === props?.post?.author?._id && (
        <button
          onClick={() => deletePostRequest(props?.post?._id)}
          className="card__delete">
          <DeleteOutlined />
        </button>
      )}

      <div>
        <span className="card__like_length">
          {props?.likes?.length !== 0 && props?.likes?.length}
        </span>

        {/* если liked === true, то есть пост отлайкан, нужно применить стиль эктив */}
        <button
          className={liked ? 'card__like card__like__is_active' : 'card__like'}
          onClick={handleLikeClick}>
          <FireOutlined />
        </button>
      </div>
    </div>
  );
};
