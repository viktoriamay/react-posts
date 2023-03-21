import './Post.scss';

export const Post = ({ posts }) => {
  return (
    <div className="post">
      <div className="post__wrapper">
        <div className="post__intro">
          <h2 className="post__title">Title Title TitleTitle Title Title Title</h2>
          <span className="post__date">24.06.2022</span>
          <div className="post__author">
            <div className="post__author_avatar">
              <img
                alt="imag"
                style={{ width: 20 }}
                src="https://cdn-icons-png.flaticon.com/512/149/149452.png"
              /><span>

              Vasya Pupkin
              </span>
            </div>
            <span className='post__author_about'>about user</span>
          </div>
        </div>
        <div className="post__image">
          <img
            alt="imag"
            src="https://game-zoom.ru/wp-content/uploads/2022/08/pubg-battlegrounds-faq.webp"
          />
        </div>
      </div>
      <div className="post__description">
        <p className='post__text'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi ut quod
          harum? Unde maxime nisi animi quo itaque at amet modi facere
          praesentium. Quod animi, suscipit culpa cupiditate officia fugiat.
        </p>
        <span className='post__tags'>tags, lorem, ipsum, dolor, sit, amet </span>
      </div>
      <div className='post__likes'>
        <div>Нравится <span>5</span></div>
        <div>Поставить лайк</div>
      </div>
    </div>
  );
};
