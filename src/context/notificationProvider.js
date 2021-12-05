import React, { useContext, useState, useEffect, useCallback } from 'react'
import { getMentionNoti } from '../services/resizeService';
import { useSocket } from './socketProvider';

const NotificationContext = React.createContext()

export function useNotifications() {
    return useContext(NotificationContext)
}

export function NotificationProvider({ user, children }) {
    const [allNoti, setAll] = useState([])
    const [mention, setMention] = useState([])
    const [unreadCount, setCount] = useState(0)
    const socket = useSocket()

    const getNotification = async () => {
        const noti = await getMentionNoti(user.username)
        // console.log(noti);
        setMention(noti.notification)
    }

    // useEffect(() => {

    //     setCount()
    // }, [mention, allNoti])

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-postnoti', (data) => {
            // console.log(data);
            setAll(prev => [...prev, data])
        })
    }, [socket])

    useEffect(() => {
        if (socket == null) return
        socket.on('follower-added', (notification) => {
            setCount(prev => prev + 1)
            setMention(prev => [...prev, notification])
        })
    }, [socket])

    // console.log(allNoti, mention);
    const value = {
        allNoti,
        mention,
        getNotification,
        unreadCount,
        setCount
    }
    // console.log(unreadCount);
    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}
