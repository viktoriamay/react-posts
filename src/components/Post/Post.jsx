
import { LeftOutlined, SwapLeftOutlined } from '@ant-design/icons';
import './Post.scss';

export const Post = (props) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const desctiptionHTML = {__html: props?.text.replace(props?.text[0], props?.text[0].toUpperCase())};
  

  console.log( desctiptionHTML );
  return (
    <div>
      <div className="post__button_back">
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
                {new Date(props?.created_at).toLocaleString('ru-RU', options)}
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
          {/* <hr width="70%" /> */}
        </div>
        {props?.tags?.length !== 0 && (
          <p className="post__tags">
            {props?.tags?.map((tag) => (
              <span className='post__tag'>#{tag}</span>
            ))}
          </p>
        )}
        <div className="post__likes">
          <div>
            Нравится <span>{props?.likes?.length}</span>
          </div>
          <div>Поставить лайк</div>
        </div>
      </div>
    </div>
  );
};
