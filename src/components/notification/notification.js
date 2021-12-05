import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { NOTIFIACATION, NOTIMENTION } from '../../constants/routes';
import { useNotifications } from '../../context/notificationProvider';
import NotiAll from './notiAll';
import NotiMention from './notiMention';

export default function Notification() {
    const [select, setSelect] = useState(0)
    const { getNotification, setCount } = useNotifications()

    useEffect(() => {
        getNotification()
        setCount(0)
    }, [])

    useEffect(() => {
        if (select === 0) {
            document.getElementById('noti_men').classList.remove('noti__tab-item-active')
            document.getElementById('noti_all').classList.add('noti__tab-item-active')
        }
        else if (select === 1) {
            document.getElementById('noti_all').classList.remove('noti__tab-item-active')
            document.getElementById('noti_men').classList.add('noti__tab-item-active')
        }
    }, [select])
    return (
        <div className="noti">
            <div className="heading-black">Notifications</div>
            <div className="noti__tab">
                <Link to={NOTIFIACATION} onClick={() => setSelect(0)} id="noti_all" className="noti__tab-item noti__tab-item-active"><div >All</div></Link>
                <Link to={NOTIMENTION} onClick={() => setSelect(1)} id="noti_men" className="noti__tab-item"><div >Mentions</div></Link>
            </div>
            <div className="noti__content">
                <Switch>
                    <Route path={NOTIMENTION}>
                        <NotiMention />
                    </Route>
                    <Route path={NOTIFIACATION}>
                        <NotiAll />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
