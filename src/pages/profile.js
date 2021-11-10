import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getusersFollowing, getusersFollowers, getUserByUsername, getuserDisplayImgs } from '../services/userServices'
import * as ROUTES from '../constants/routes';
import UserProfile from '../components/profile';
import ReactLoader from '../components/loader';
import LoggedInUserContext from '../context/logged-in-user';

export default function Profile(props) {
  const { username } = useParams();
  const { loggedInUser } = useContext(LoggedInUserContext)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  useEffect(() => {
    setLoading(true)
    async function getUserDetails(user) {
      const followers = await getusersFollowers(username);
      const following = await getusersFollowing(username);
      const result = await getuserDisplayImgs(username)
      setUser({ ...user, followers: followers, following: following, displayImg: result?.displayImg });
      setLoading(false)
    }

    async function checkUserExists() {
      try {
        const result = await getUserByUsername(username);
        if (loggedInUser && username === loggedInUser?.username) {
          setUser(loggedInUser)
          setLoading(false)
        }
        else {
          getUserDetails(result);
        }
      } catch (error) {
        history.push(ROUTES.NOT_FOUND)
      }
    }

    checkUserExists()

  }, [username, history]);

  return (
    <>
      {loading ? (
        <ReactLoader />
      ) : (
        <div className="bg-gray-background">
          <div className="mx-auto max-w-screen-lg">
            <UserProfile user={user} setUser={setUser} />
          </div>
        </div>
      )
      }
    </>
  )
}
