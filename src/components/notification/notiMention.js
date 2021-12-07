import React from 'react'
import { useNotifications } from '../../context/notificationProvider'
import MenNoti from './MenNoti';


export default function NotiMention() {
    const { mention } = useNotifications()

    return (
        <div>
            {mention.length ?
                mention.map(item => (
                    <>
                        <MenNoti noti={item} />
                    </>
                )) : <></>}
        </div>
    )
}
