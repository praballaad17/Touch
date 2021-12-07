import React, { useContext, useState, useEffect, createContext, useCallback } from 'react'
import { getUserPhotosByUsername } from '../services/postServices';
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

    async function getProfilePost(username, pageNumber) {
        console.log("get profile post");
        setLoading(true)
        let limit = 10
        let i = 0
        while (i < allProfilepost.length && allProfilepost[i].username !== username) {
            ++i
        }
        if (i < allProfilepost.length && profilePost.length <= (pageNumber * limit) && !hasMore) {
            console.log(pageNumber);
            // if ()
            console.log(allProfilepost[i].posts.length);
            setLoading(false)
            return setProfilePost(allProfilepost[i].posts)
        }
        else {
            try {
                const posts = await getUserPhotosByUsername(username, pageNumber, limit)
                if (!posts.result.length) setMore(false)
                setProfilePost(prev => [...prev, ...posts.result])
                setAllProfilePost(prev => [...prev, { username, posts: posts.result }])
                setMore(true)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
    }


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

    function removeFromAllProfilePost(username, id) {
        setAllProfilePost(prev => {
            let madeChange = false;
            const newpost = prev.map(item => {
                if (item.username === username) {
                    madeChange = true
                    return {
                        ...item,
                        posts: item.posts.filter(p => p._id != id)
                    }
                }
                return item
            })
            if (madeChange) return newpost
            else return prev
        })
        setProfilePost(profilePost.filter(p => p._id !== id))
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
        addToAllProfilePost,
        removeFromAllProfilePost
    }

    return (
        <UserPostContext.Provider value={value}>
            {children}
        </UserPostContext.Provider>
    )
}