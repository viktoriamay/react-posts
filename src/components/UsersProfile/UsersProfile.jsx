import { useState, useEffect, useContext } from 'react';
import api from './../../utils/api';
import { useParams } from 'react-router-dom';
import { PostPage } from '../../pages/PostPage/PostPage';
import { Post } from './../Post/Post';
import { PostsContext } from './../../context/PostsContext';
import { PagesBackButton } from '../PagesBackButton/PagesBackButton';
import './UsersProfile.scss';
import { NumberOutlined, SendOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

export const UsersProfile = () => {
  const [userById, setUserById] = useState(null);

  const params = useParams();

  useEffect(() => {
    api
      .getUserById(params.userId)
      .then((userIdData) => setUserById(userIdData));
  }, [params.userId, setUserById]);

  return (
    <div>
      <div className="button_back_offset">
        <PagesBackButton />
      </div>
      <div className="user_profile">
        <div className="user_profile__avatar">
          <img src={userById?.avatar} alt="user-avatar" />
        </div>
        <h2 className="user_profile__name">{userById?.name}</h2>
        <div className="user_profile__info">
        <UserOutlined />
          <p >{userById?.about}</p>
        </div>
        <div className="user_profile__info">
        <SendOutlined />
          <p>{userById?.email}</p>
        </div>
        <div className="user_profile__info">
        <NumberOutlined />
          <p>{userById?._id}</p>
        </div>
        <div className="user_profile__info">
        <TeamOutlined />
          <p>{userById?.group}</p>
        </div>
      </div>
    </div>
  );
};
