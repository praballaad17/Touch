import React, { useContext, useState, useEffect, createContext, useCallback, useReducer } from 'react'
import { useSocket } from './socketProvider';

const PostContext = createContext();
export function usePost() {
    return useContext(PostContext)
}
export function PostProvider({ children }) {
    const socket = useSocket()
    const ACTION = {
        ADD_POST: 'add-post',
        SET_LOAD: 'set-load'
    }
    function reducer(state, action) {
        switch (action.type) {
            case ACTION.ADD_POST:
                return {
                    loading: false, hasMore: action.payload.hasMore,
                    savedTimeline: [...state.savedTimeline, action.payload.savedTimeline]
                }
            case ACTION.SET_LOAD:
                return {
                    ...state, loading: action.payload.loading
                }
            default:
                return state;
        }
    }
    const initialState = {
        savedTimeline: [],
        loading: false,
        hasMore: false
    }
    const [timeline, setTimeline] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [{ savedTimeline, loading, hasMore }, dispatch] = useReducer(
        reducer, initialState
    )


    const addToSaveTimeline = useCallback((posts) => {
        dispatch({ type: ACTION.ADD_POST, payload: { savedTimeline: posts, hasMore: posts.hasMore } })
    }, [dispatch])

    const getTimeline = () => {
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
            setTimeline(prev => [...prev, ...savedTimeline[pageNumber - 1]?.result])
        }
    }, [savedTimeline])

    const value = {
        timeline,
        setTimeline,
        getTimeline,
        pageNumber,
        setPageNumber,
        hasMore,
        loading,
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}