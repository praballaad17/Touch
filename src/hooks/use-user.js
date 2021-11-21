import { useState, useEffect } from 'react';
import { useSocket } from '../context/socketProvider';
import { getUserByUsername, getusersFollowers, getusersFollowing, getuserDisplayImgs } from '../services/userServices';

export default function useUser(username) {
  const socket = useSocket()
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState();
  console.log("useuser", username);

  async function getUserObjByUserId(username) {
    try {
      console.log("geting users");

      const user = await getUserByUsername(username);
      const followers = await getusersFollowers(username);
      const following = await getusersFollowing(username);
      const { displayImg } = await getuserDisplayImgs(username);
      console.log(user);
      setActiveUser({ ...user, followers: followers, following: following, displayImg: displayImg } || {});
      setUsers(prevusers => [...prevusers, { ...user, followers: followers, following: following, displayImg: displayImg }])
      console.log("after user");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (username) {
      console.log("in if");
      const user = users.map(user => {
        if (user.username === username) {
          return user
        }
      })
      if (user) setActiveUser(user)
      else getUserObjByUserId(username);
    }
  }, [username]);

  // useEffect(() => {
  //   setUsers(prevusers => [...prevusers, activeUser])
  // }, [activeUser])

  console.log(users, activeUser);
  return { user: activeUser, setActiveUser };
}
