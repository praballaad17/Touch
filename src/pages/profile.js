import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserProfile from '../components/profile';
import ReactLoader from '../components/loader';
import { useUser } from '../context/userProvider';
import { useUserPost } from '../context/userPostProvider';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState()

  useEffect(() => {
    document.title = `${username} | Touch`;
  }, [username]);

  const { getUser, user: loggedInUser, loading } = useUser()
  const { getProfilePost, loading: profLoad, pageNumber, setPageNumber } = useUserPost()

  useEffect(() => {
    async function getuser() {
      if (loggedInUser?.username !== username) {
        try {
          const user = await getUser(username)
          setUser(user)
        } catch (error) {
          console.log(error);
        }
      }
    }
    getuser()
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
            <UserProfile user={user} setPageNumber={setPageNumber} />}
          {/* {user && <UserProfile user={user} setUser={setUser} setPageNumber={setPageNumber} />} */}
        </div>
      )
      }
    </>
  )
}
