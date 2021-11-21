import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useSocket } from './socketProvider';

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedConversationGroupId, setSelectedConversationGroupId] = useState()
    const socket = useSocket()

    const retriveGroups = () => {
        if (socket == null || conversations.length) return
        setLoading(true)
        socket.emit('get-groups')
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-groups', (data) => {
            setLoading(false)
            setConversations(prev => [...prev, ...data])
        })
    }, [socket, setConversations])

    function createGroup(selectedId, selected) {
        if (socket == null) return
        socket.emit('create-new-group', { selectedId, selected })
        // createConversation()
    }

    const createConversation = useCallback((group) => {
        setConversations(prevConversations => {
            return [...prevConversations, group]
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-new-group', (group) => {
            createConversation(group)
        })
    }, [socket, createConversation])

    useEffect(() => {
        if (socket == null) return
        socket.on('responce-create-new-group', (group) => {
            createConversation(group)
        })
    }, [socket, createConversation])

    const addMessageToConversation = useCallback(({ members, text, sender, date, groupId }) => {
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text, date }
            const newConversations = prevConversations.map(conversation => {
                if (conversation._id === groupId) {
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange) {
                return newConversations
            } else {
                return [
                    ...prevConversations,
                    { _id: groupId, members, messages: [newMessage] }
                ]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])



    function sendMessage(members, text, groupId) {
        const date = new Date()
        socket.emit('send-message', { members, text, groupId, date })

        addMessageToConversation({ members, text, sender: id, date, groupId })
    }


    const formattedConversations = conversations.map((conversation, index) => {

        const messages = conversation.messages.map(message => {
            const members = conversation.members.find(contact => {
                return contact?._id === message?.sender
            })
            const name = (members && members.fullName) || message?.sender
            const fromMe = id === message?.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = conversation._id === selectedConversationGroupId

        return { ...conversation, messages, selected }
    })

    useEffect(() => {
        formattedConversations.map(conversation => {
            if (conversation._id === selectedConversationGroupId) setSelectedConversation(conversation)
        })
    }, [selectedConversationGroupId])

    const value = {
        conversations: formattedConversations,
        selectedConversation,
        sendMessage,
        createConversation,
        setSelectedConversationGroupId,
        selectedConversationGroupId,
        retriveGroups,
        createGroup,
        loading
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}