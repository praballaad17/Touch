import { useParams, useHistory } from 'react-router-dom';
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

  const { getUser, user: loggedInUser, profile, loading } = useUser()
  const { getProfilePost, loading: profLoad, pageNumber, setPageNumber } = useUserPost()

  useEffect(() => {
    if (loggedInUser?.username !== username) {
      try {
        getUser(username)
      } catch (error) {
        console.log(error);
      }
    }
  }, [username])

  useEffect(async () => {
    try {
      console.log("getting posts");
      await getProfilePost(username, pageNumber)
    } catch (error) {
      console.log(error);
    }
  }, [username, pageNumber])
  // console.log(loading, profLoad);

  return (
    <>
      {loading && profLoad ? (
        <ReactLoader />
      ) : (
        <div className="profile">
          {loggedInUser?.username == username ?
            <UserProfile user={loggedInUser} setPageNumber={setPageNumber} /> :
            <UserProfile user={profile} setPageNumber={setPageNumber} />}
          {/* {user && <UserProfile user={user} setUser={setUser} setPageNumber={setPageNumber} />} */}
        </div>
      )
      }
    </>
  )
}
