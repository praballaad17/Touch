import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import UserProfile from '../components/profile';
import ReactLoader from '../components/loader';
import { useUser } from '../context/userProvider';
import { useUserPost } from '../context/userPostProvider';

export default function Profile() {
  const { username } = useParams();

  useEffect(() => {
    document.title = `${username} | Touch`;
  }, [username]);

  const { getUser, loading } = useUser()
  const { getProfilePost, loading: profLoad, pageNumber, setPageNumber } = useUserPost()

  useEffect(() => {
    getUser(username)
  }, [username])

  useEffect(() => {
    try {
      getProfilePost(username, pageNumber)
    } catch (error) {
      console.log(error);
    }
  }, [username, pageNumber])


  return (
    <>
      {loading && profLoad ? (
        <div className="u-flex-all-center"><ReactLoader /></div>
      ) : (
        <div className="profile">
          <UserProfile username={username} setPageNumber={setPageNumber} />
        </div>
      )
      }
    </>
  )
}
