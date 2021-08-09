import { useState, useEffect } from 'react';
import { getPost, retrivePostByUserId } from '../services/postServices';

export default function usePhotos(user, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([]);
  const [hasMore, setMore] = useState(false)

  useEffect(async () => {
    setLoading(true)
    setError(false)
    async function getTimelinePhotos() {

      // does the user actually follow people?
      if (user?.following?.length > 0) {
        try {
          const post = await getPost(user._id, pageNumber, 5);

          // re-arrange array to be newest photos first by dateCreated
          const sortedPost = post.results.sort((a, b) => {
            const dateA = new Date(a.date), dateB = new Date(b.date)
            return dateB - dateA
          })
          setPosts(prevPost => { return [...prevPost, ...sortedPost] });
          setMore(post.results.length > 0)
          setLoading(false)
        } catch (error) {
          setError(true)
          console.log(error);
        }
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following, pageNumber]);

  return { posts, loading, error, hasMore, setPosts };
}
