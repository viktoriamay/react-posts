import {
  CommentOutlined,
  FireOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Card.scss';
import { useState } from 'react';

export const Card = () => {
  
  const [classActiveCard, setClassActiveCard] = useState(false);
  const [classHoverCard, setClassHoverCard] = useState(false);
  return (
    

    <div className="card">
      <div
        className={'card__wrapper'}
        onMouseDown={() => setClassActiveCard(true)}
        onMouseUp={() => setClassActiveCard(false)}
        onMouseOver={() => setClassHoverCard(true)}
        onMouseOut={() => setClassHoverCard(false)}
        >
        <div className="card__img_container">
          <img
            className="card__img"
            src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            alt="desc"
          />
        </div>
        <div className="card__description">
          <div className="card__info">
            <span className="card__info_about">
              <UserOutlined />
              Author
            </span>
            <span className="card__info_about">
              <CommentOutlined />
              Comments
            </span>
          </div>
          <h2 className="card__title">Title</h2>
          <p className="card__text">Text</p>
          <div className="card__info">
            <span
              className={
                classActiveCard
                  ? 'card__link_more card__link__more_active'
                  : 'card__link_more' 
                && classHoverCard
                  ? 'card__link_more card__link__more_hover'
                  : 'card__link_more'
              }>
              Read More
              <RightOutlined />
            </span>
          </div>
        </div>
      </div>
      <FireOutlined className="card__like" />
    </div>
  );
};
