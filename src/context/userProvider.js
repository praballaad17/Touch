import React, { useContext, useState, useEffect, createContext, useCallback } from 'react'
import { useSocket } from './socketProvider';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext)
}
export function UserProvider({ user, children }) {
    const socket = useSocket()
    const [users, setUsers] = useState([])
    const [activeUser, setActiveUser] = useState()
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(false)

    const updateUser = useCallback((ruser) => {
        setLoading(false)
        setActiveUser(ruser);
        setUsers(prev => [...prev, ruser])
    }, [setActiveUser, setUsers])

    useEffect(() => {
        if (socket == null) return
        setLoading(true)
        socket.on('receive-logged-user', updateUser)

    }, [socket, updateUser])


    function getUser(username) {
        setLoading(true)
        let i = 0
        while (i < users.length && users[i].username != username) {
            ++i
        }
        if (i < users.length) {

            setLoading(false)
            return setProfile(users[i])
        }
        else {
            console.log("not found");
            try {
                socket.emit('fetch-user', username)

            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-user', (user) => {
            setLoading(false)
            setProfile(user)
            setUsers(prev => [...prev, user])
        })
    }, [socket, setUsers])

    // function toggleFollow(isFollowingProfile, profileUserId, followingUserId) {
    //     if (isFollowingProfile) {  
    //         console.log("unfollwing");
    //         //remove followingUserId from profileUserId's follower list
    //         //remove profileUserId from followingUserId's following list
    //         await axios.put(`${apiEndpoint}/unfollow/${profileUserId}`, {
    //             followingUserId
    //         })
    //     }
    //     else {
    //         console.log("follow");
    //         //add followingUserId in profileUserId's follower list
    //         //add profileUserId's from followingUserId's following list
    //         await axios.put(`${apiEndpoint}/follow/${profileUserId}`, {
    //             followingUserId
    //         })

    //     }
    // }


    const value = {
        user: activeUser,
        setActiveUser,
        getUser,
        profile,
        setProfile,
        loading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
