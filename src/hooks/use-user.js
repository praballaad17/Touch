import { useState, useEffect } from 'react';
import { getUserByUsername, getusersFollowers, getusersFollowing } from '../services/userServices';

export default function useUser(username) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjByUserId(username) {
      const user = await getUserByUsername(username);
      const followers = await getusersFollowers(username);
      const following = await getusersFollowing(username);
      // const user = await getUserByUserId(userId);
      // const followers = await getusersFollowersById(userId);
      setActiveUser({ ...user, followers: followers, following: following } || {});
    }

    if (username) {
      getUserObjByUserId(username);
    }
  }, [username]);

  return { user: activeUser, setActiveUser };
}
