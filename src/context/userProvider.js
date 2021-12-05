import React, { useContext, useState, useEffect, createContext, useCallback } from 'react'
import { getuserDisplayImgs, getUserByUsername } from '../services/userServices';
import { useSocket } from './socketProvider';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext)
}
export function UserProvider({ user, children }) {
    const socket = useSocket()
    const [users, setUsers] = useState([])
    const [usersProfileImgs, setUsersProfileImgs] = useState([])
    const [activeUser, setActiveUser] = useState()
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(false)
    const queue = [], userQueue = []

    const updateUser = useCallback((ruser) => {
        setActiveUser(ruser);
        setUsers(prev => [...prev, ruser])
    }, [setActiveUser, setUsers])

    useEffect(() => {
        if (socket == null) return
        setLoading(true)
        socket.on('receive-logged-user', updateUser)

    }, [socket, updateUser])

    // const checkAuth = (user) => {

    // }


    async function getUser(username) {
        setLoading(true)
        let i = 0
        while (i < users.length && users[i].username != username) {
            ++i
        }
        if (i < users.length) {

            setLoading(false)
            return users[i]
        }
        else {
            try {
                const user = await getUserByUsername(username)
                setUsers(prev => [...prev, user])
                return user
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        if (socket == null) return
        socket.on('receive-user', (user) => {
            // setLoading(false)
            // setProfile(user)
            setUsers(prev => [...prev, user])
        })
    }, [socket, setUsers])

    function toggleFollow(isFollowingProfile, profileUserId, followingUserId) {
        if (isFollowingProfile) {
            console.log("unfollwing");
            //remove followingUserId from profileUserId's follower list
            //remove profileUserId from followingUserId's following list
            socket.emit('unfollow', ({ profileUserId, followingUserId }))
            const following = activeUser.following.filter(i => i._id !== profileUserId)
            setActiveUser({ ...activeUser, following })
        }
        else {
            console.log("follow");
            //add followingUserId in profileUserId's follower list
            //add profileUserId's from followingUserId's following list
            socket.emit('follow', ({ profileUserId, followingUserId }))
            setActiveUser({ ...activeUser, following: [...activeUser.following, { _id: profileUserId }] })
        }
    }

    const getProfileImg = async (username) => {
        let i = 0

        while (i < usersProfileImgs.length && usersProfileImgs[i].user.username !== username) {
            ++i
        }
        if (i < usersProfileImgs.length) {
            return usersProfileImgs[i]
        } else {

            try {
                const profileImg = await getuserDisplayImgs(username)
                setUsersProfileImgs(prev => [...prev, profileImg])
                return profileImg

            } catch (error) {
                console.log(error);
                return
            }
        }
    }

    console.log(activeUser);

    const value = {
        user: activeUser,
        setActiveUser,
        getUser,
        profile,
        setProfile,
        loading,
        getProfileImg,
        usersProfileImgs,
        toggleFollow
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
