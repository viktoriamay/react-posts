import { LeftOutlined, SwapLeftOutlined } from '@ant-design/icons';
import './Post.scss';

export const Post = (props) => {
  console.log({props});
  return (
    <div>
      <div className="post__button_back">
        <LeftOutlined />
        <span>Назад</span>
      </div>

      <div className="post">
        <div className="post__wrapper">
          <div className="post__intro">
            <h2 className="post__title">
            {props.title.replace(props.title[0], props.title[0].toUpperCase())}
            </h2>
            <span className="post__date">{props.created_at}</span>
            <div className="post__author">
              <div className="post__author_avatar">
                <img
                  alt="imag"
                  style={{ width: 20 }}
                  src="https://cdn-icons-png.flaticon.com/512/149/149452.png"
                />
                <span>{props.author?.name}</span>
              </div>
              <span className="post__author_about">{props.author?.about}</span>
            </div>
          </div>
          <div className="post__image">
            <img
              alt="imag"
              src={props.image}
            />
          </div>
        </div>
        <div className="post__description">
          <p className="post__text">
          {props.text.replace(props.text[0], props.text[0].toUpperCase())}
          </p>
          <span className="post__tags">
            tags, lorem, ipsum, dolor, sit, amet{' '}
          </span>
        </div>
        <div className="post__likes">
          <div>
            Нравится <span>5</span>
          </div>
          <div>Поставить лайк</div>
        </div>
      </div>
    </div>
  );
};
