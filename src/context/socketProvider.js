import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { apiUrl } from "../config.json";
const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ jwt, children }) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        if (!jwt) return
        const newSocket = io(
            // 'http://localhost:3003/',
            'https://touch-app-server.herokuapp.com/',
            { query: { jwt } }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [jwt])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
