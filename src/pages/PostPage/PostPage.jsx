import Spinner from '../../components/Spinner/Spinner';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Post } from '../../components/Post/Post';

const postId = '641804d1aa3971218392e58c'

export const PostPage = ({posts}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    setIsLoading(true);
    api
      .getPostById(postId)
      .then((postData) => setPost(postData))
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  }, []);

  return <div>
  {/* <Spinner /> */}
  {isLoading ? <Spinner /> : <Post posts={posts} />}</div>;
};
