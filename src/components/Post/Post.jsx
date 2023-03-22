
import { LeftOutlined } from '@ant-design/icons';
import './Post.scss';
import { useNavigate } from 'react-router-dom';

export const Post = (props) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  // небезопасный способ вставки данных с бэка
  const desctiptionHTML = {__html: props?.text?.replace(props?.text[0], props?.text[0].toUpperCase())};

  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate(-1)} className="post__button_back">
        <LeftOutlined />
        <span>Назад</span>
      </div>

      <div className="post">
        <div className="post__wrapper">
          <div className="post__intro">
            <div className="post__intro_info">
              <h2 className="post__title">
                {props?.title?.replace(
                  props?.title[0],
                  props?.title[0].toUpperCase(),
                )}
              </h2>
              <hr width="60%" style={{margin: '1rem auto'}} />
              <span className="post__date">
                {new Date(props?.created_at).toLocaleString('ru-RU', options).slice(0, -3)}
              </span>
            </div>
            <div className="post__author">
              <div className="post__author_avatar">
                <div className="post__author_avatar_img_container">
                  <img alt="imag" src={props?.author?.avatar} />
                </div>
                <span>{props?.author?.name}</span>
              </div>
              <span className="post__author_about">{props?.author?.about}</span>
            </div>
          </div>
          <div className="post__image">
            <img alt="imag" src={props?.image} />
          </div>
        </div>
        <div className="post__description">
          <p className="post__text" dangerouslySetInnerHTML={desctiptionHTML} >
          </p>
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
          <div onClick={props.onPostLike}>Поставить лайк</div>
        </div>
      </div>
    </div>
  );
};
