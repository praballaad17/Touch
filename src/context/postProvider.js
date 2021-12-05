import React, { useContext, useState, useEffect, createContext, useCallback, useReducer } from 'react'
import { getPostById } from '../services/postServices';
import { useSocket } from './socketProvider';

const PostContext = createContext();
export function usePost() {
    return useContext(PostContext)
}
export function PostProvider({ children }) {
    const socket = useSocket()
    const ACTION = {
        ADD_POST: 'add-post',
        SET_LOAD: 'set-load',
        ADD_RECIVED_POST: 'add-received-post',
        ADD_POST_AT_START: 'add-post-at-start'
    }
    function reducer(state, action) {
        switch (action.type) {
            case ACTION.ADD_POST:
                return {
                    ...state,
                    loading: false, hasMore: action.payload.hasMore,
                    savedTimeline: [...state.savedTimeline, action.payload.savedTimeline]
                }
            case ACTION.SET_LOAD:
                return {
                    ...state, loading: action.payload.loading
                }
            case ACTION.ADD_RECIVED_POST:
                return {
                    ...state,
                    recievedPosts: [action.payload.recievedPosts, ...state.recievedPosts]
                }
            case ACTION.ADD_POST_AT_START:

                return {
                    ...state,
                    savedTimeline: [{ ...state.savedTimeline[0], result: [...state.recievedPosts, ...state.savedTimeline[0].result] },
                    ...state.savedTimeline],
                    recievedPosts: []
                }
            default:
                return state;
        }
    }
    const initialState = {
        // savedTimeline: [{pageNumber: 0, hasMore: true, result: []},],
        savedTimeline: [],
        recievedPosts: [],
        loading: false,
        hasMore: false
    }
    const [timeline, setTimeline] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [{ savedTimeline, recievedPosts, loading, hasMore }, dispatch] = useReducer(
        reducer, initialState
    )


    const addToSaveTimeline = useCallback((posts) => {
        dispatch({ type: ACTION.ADD_POST, payload: { savedTimeline: posts, hasMore: posts.hasMore } })
    }, [dispatch])

    const getTimeline = () => {
        console.log("in timeline", socket);
        if (socket == null) return

        dispatch({ type: ACTION.SET_LOAD, payload: { loading: true } })
        let i = 0, limit = 10
        console.log(savedTimeline, pageNumber);
        while (i < savedTimeline.length && savedTimeline[i].pageNumber !== pageNumber) {
            ++i
        }
        if (i < savedTimeline.length) {
            return
        }
        else {
            try {
                console.log("get timline");
                socket.emit('get-timeline', { pageNumber, limit })
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-timeline', addToSaveTimeline)
    }, [socket, addToSaveTimeline])


    useEffect(() => {
        if (savedTimeline.length) {
            savedTimeline.map(item => {
                setTimeline(prev => [...prev, ...item.result])

            })
        }
    }, [savedTimeline])

    const postFeed = (files, fileNames, postId, caption) => {
        if (socket == null) return
        dispatch({ type: ACTION.SET_LOAD, payload: { loading: true } })
        try {
            socket.emit('post-feed', { files, fileNames, postId, caption })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-post', (post) => {
            console.log("recived post");
            console.log(post);
            dispatch({ type: ACTION.ADD_RECIVED_POST, payload: { recievedPosts: post } })
        })
    }, [socket])

    const addRecivedToTimeline = useCallback(() => {
        setTimeline(prev => [...recievedPosts, ...prev])
        dispatch({ type: ACTION.ADD_RECIVED_POST, payload: { recievedPosts: [] } })
    })

    const getPostFromTimeline = async (postId) => {
        let i = 0
        console.log(postId);
        while (i < timeline.length && timeline[i]._id !== postId) {
            ++i

        }
        if (i < timeline.length) {
            console.log(timeline[i]);
            return timeline[i]
        }
        else {
            try {
                const post = await getPostById(postId)
                console.log(post);
                return post
            } catch (error) {
                console.log(error)
                return;
            }
        }
    }
    console.log(timeline);
    const value = {
        getPostFromTimeline,
        timeline,
        setTimeline,
        getTimeline,
        pageNumber,
        setPageNumber,
        hasMore,
        loading,
        postFeed,
        recievedPosts,
        addRecivedToTimeline
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}