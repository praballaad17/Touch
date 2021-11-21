import React, { useContext, useState, useEffect, createContext, useCallback } from 'react'
import { useSocket } from './socketProvider';

const UserPostContext = createContext();
export function useUserPost() {
    return useContext(UserPostContext)
}
export function UserPostProvider({ children }) {
    const socket = useSocket()
    const [allProfilepost, setAllProfilePost] = useState([])
    const [profilePost, setProfilePost] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        console.log("in profile context");
    }, [socket])

    const addprofilepost = useCallback(({ posts, username }) => {
        setProfilePost([...posts.result])
        setAllProfilePost(prev => [...prev, { username, posts: posts.result }])
        // setAllProfilePost(prev => {
        //     let find = false;
        //     prev.map(item => {
        //         if (item.username === username) {
        //             find = true
        //             return item
        //         }
        //         return item
        //     })
        //     if (find) return prev
        //     else return [...prev, { username, posts: rposts.result }]
        // })
        setLoading(false)
        setMore(posts?.result.length > 0)
    }, [setAllProfilePost, setProfilePost])

    function getProfilePost(username, pageNumber) {
        setLoading(true)
        let limit = 10
        let i = 0
        while (i < allProfilepost.length && allProfilepost[i].username !== username) {
            ++i
        }
        if (i < allProfilepost.length) {
            setLoading(false)
            return setProfilePost(allProfilepost[i].posts)
        }
        else {
            console.log("get Post");
            try {
                socket.emit('get-profile-post', { username, pageNumber, limit })

                // return () => socket.off('receive-profile-post') 
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-profile-post', addprofilepost)
    }, [socket, addprofilepost])

    function addToAllProfilePost(username, post) {
        setAllProfilePost(prev => {
            let madeChange = false;
            const newAlluserPosts = prev.map(item => {
                if (item.username === username) {
                    madeChange = true
                    return {
                        ...item,
                        posts: [post, ...item.posts]
                    }
                }
                return item
            })
            if (madeChange) return newAlluserPosts
            else return [...prev, {
                username, posts: [post]
            }]
        })
    }

    const value = {
        profilePost,
        setProfilePost,
        getProfilePost,
        setAllProfilePost,
        pageNumber,
        setPageNumber,
        hasMore,
        setMore,
        loading,
        addToAllProfilePost
    }

    return (
        <UserPostContext.Provider value={value}>
            {children}
        </UserPostContext.Provider>
    )
}