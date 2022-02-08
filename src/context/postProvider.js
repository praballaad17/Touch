import React, { useContext, useState, useEffect, createContext, useCallback, useReducer } from 'react'
import { getPost, getPostById, deleteCommentByPostId } from '../services/postServices';
import { useSocket } from './socketProvider';

const PostContext = createContext();
export function usePost() {
    return useContext(PostContext)
}

export function PostProvider({ children }) {
    const socket = useSocket()
    const [node, setNode] = useState()
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
        let hasMore = true
        if (!posts.result.length)  hasMore = false
        dispatch({ type: ACTION.ADD_POST, payload: { savedTimeline: posts, hasMore: hasMore } })
        setTimeline(prev => [...prev, ...posts.result])
    }, [dispatch])

    const getTimeline = async (userId) => {
        if (socket == null) return

        dispatch({ type: ACTION.SET_LOAD, payload: { loading: true } })
        let i = 0, limit = 10
    
        while (i < savedTimeline.length && savedTimeline[i].pageNumber !== pageNumber) {
            ++i
        }
        if (i < savedTimeline.length) {
            return
        }
        else {
            try {
                const responce = await getPost(userId, pageNumber, limit)
                addToSaveTimeline(responce)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const postFeed = (files, fileNames, postId, caption) => {
        if (socket == null) return
        try {
            socket.emit('post-feed', { files, fileNames, postId, caption })
        } catch (error) {
            console.log(error);
        }
    }

    const addComment = (postId, comment) => {
        if (socket == null) return
       
        socket.emit('add-comment', {postId, comment})
        addCommentToPost(postId, comment)
    }

    const toggleLike = (liked, postId, userId) => {
        if (socket == null) return
            socket.emit('toggle-like', {liked, postId, userId} )
    }

    const addCommentToPost = (postId, comment) => {
        setTimeline(prev => {
            let madeChange = false;
            const result = timeline.map(item => {
                if (item._id === postId) {
                    madeChange = true
                    return {
                        ...item,
                        comments: [comment, ...item.comments]
                    }
                }
                return item
            })
            if (madeChange) return result
            else return prev 
        })
    }

    const deleteComment = async (postId, commentId) => {
        setTimeline(prev => {
            let madeChange = false;
            const newP = prev.map(item => {
                if(item._id === postId) {
                    madeChange = true
                   return { 
                       ...item,
                    comments: item.comments.filter(c => c._id !== commentId)
                    }
                }
                return item
            })
            if (madeChange) return newP
            else return prev
        })
        await deleteCommentByPostId(postId, commentId)
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-post', (post) => {
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
        while (i < timeline.length && timeline[i]._id !== postId) {
            ++i

        }
        if (i < timeline.length) {
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
        addRecivedToTimeline,
        addComment,
        toggleLike,
        deleteComment,
        node, 
        setNode
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}