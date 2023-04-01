import { useState, useEffect, useContext } from 'react';
import api from './../../utils/api';
import { useParams } from 'react-router-dom';
import { PostPage } from '../../pages/PostPage/PostPage';
import { Post } from './../Post/Post';
import { PostsContext } from './../../context/PostsContext';

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
      <img src={userById?.avatar} />
      <h2>{userById?.name}</h2>
      <p>{userById?.about}</p> 
    </div>
  );
};
