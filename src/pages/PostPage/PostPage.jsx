import Spinner from '../../components/Spinner/Spinner';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Post } from '../../components/Post/Post';

const postId = '641a1947aa39712183961233';

export const PostPage = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);
  const handlePostLike = () => {};

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getPostById(postId)
      .then((postData) => setPost(postData))
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Post
          {...post}
          currentUser={currentUser}
          handlePostLike={handlePostLike}
        />
      )}
    </div>
  );
};
