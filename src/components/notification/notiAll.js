import React from 'react'
import { useNotifications } from '../../context/notificationProvider'

export default function NotiAll() {
    const { allNoti } = useNotifications()
    return (
        <div>
            {
                allNoti.map(item => (
                    <>
                        <div>{item.author}</div>
                        <div>{item.caption}</div>
                    </>
                ))
            }
        </div>
    )
}
