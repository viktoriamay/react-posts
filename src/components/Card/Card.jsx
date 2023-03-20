import {
  CommentOutlined,
  FireOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Card.scss';
import { useState } from 'react';

export const Card = (props) => {
  const [classActiveCard, setClassActiveCard] = useState(false);
  const [classHoverCard, setClassHoverCard] = useState(false);

  return (
    <div className="card">
      <div
        className={'card__wrapper'}
        onMouseDown={() => setClassActiveCard(true)}
        onMouseUp={() => setClassActiveCard(false)}
        onMouseOver={() => setClassHoverCard(true)}
        onMouseOut={() => setClassHoverCard(false)}>
        <div className="card__img_container">
          <img className="card__img" src={props.image} alt="desc" />
        </div>
        <div className="card__description">
          <div className="card__info">
            <span className="card__info_about">
              <UserOutlined />
              {props.author.name}
            </span>
            <span className="card__info_about">
              <CommentOutlined />
              {props.comments.length}
            </span>
          </div>
          <h2 className="card__title">
            {props.title.replace(props.title[0], props.title[0].toUpperCase())}
          </h2>
          <p className="card__text">
            {props.text
              .replaceAll(/<\/?[A-Za-z]+[^>]*>/gi, '')
              .slice(0, 50)
              .replace(props.text[0], props.text[0].toUpperCase())}
            {props.text.length > 40 && '...'}
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
      </div>
      <FireOutlined className="card__like" />
    </div>
  );
};
