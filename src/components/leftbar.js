import React, { useState } from 'react'
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { faBars, faBell, faBookmark, faHome, faList, faMailBulk, faPlus, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleBar from './toggleBar';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import { useNotifications } from '../context/notificationProvider';
import { useConversations } from '../context/conversationProvider';

export default function Leftbar({ loggedInUser, user, onClose }) {
    const [show, setShow] = useState(false)
    const { unreadCount } = useNotifications()
    const { unseen } = useConversations()

    return (
        <>
            <div className="leftbar__toglebar">
                <ToggleBar show={show} loggedInUser={loggedInUser} onClose={() => setShow(false)} />
            </div>

            <div className="leftbar">
                <ul className="link-list">
                    <li className="link-list-item" onClick={onClose}>
                        <Link className="link u-flex-center" to={`/user/${user?.username}`} aria-label="Profile">
                            <img className="link-list--proImg" src={
                                loggedInUser?.displayImg?.profileImg.length ? loggedInUser?.displayImg?.profileImg : DEFAULT_IMAGE_PATH}
                                alt={user?.username} />
                            <span className="link--text">{user?.username}</span>
                        </Link>
                    </li>
                    <li className="link-list-item">
                        <Link className="link" to={ROUTES.TIMELINE} aria-label="Dashboard">
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faHome} /></span>
                            <span className="link--text">Home</span>
                        </Link>
                    </li>
                    {user && <> <li className="link-list-item">
                        <Link className="link" to={ROUTES.NOTIFIACATION} aria-label="Dashboard">
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faBell} />
                                <div className="link--icon-top">{unreadCount ? unreadCount : ""}</div>
                            </span>
                            <span className="link--text">Notifications</span>
                        </Link>
                    </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.MESSAGES} aria-label="Messages">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faMailBulk} />
                                    <div className="link--icon-top">{unseen ? unseen : ""}</div>
                                </span>
                                <span className="link--text">Messages</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.TIMELINE} aria-label="Dashboard">
                                <span className="link--icon"><FontAwesomeIcon icon={faBookmark} /></span>
                                <span className="link--text">Bookmarks</span>
                            </Link>
                        </li>
                        <li className="link-list-item">
                            <Link className="link" to={ROUTES.TIMELINE} aria-label="Dashboard">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faList} /></span>
                                <span className="link--text">List</span>
                            </Link>
                        </li>
                        {/* <li className="link-list-item">
                            <Link className="link" to={ROUTES.TIMELINE} aria-label="Dashboard">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faChild} /></span>
                                <span className="link--text">Subscription</span>
                            </Link>
                        </li> */}
                        <li className="link-list-item">
                            <Link className="link" to={`/user/${user?.username}`} aria-label="Dashboard">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faUser} /></span>
                                <span className="link--text">My Profile</span>
                            </Link>
                        </li>
                    </>
                    }
                    <li className="link-list-item" onClick={() => setShow(true)}>
                        <Link className="link"  >
                            <span className="link--icon">
                                <FontAwesomeIcon icon={faBars} /></span>
                            <span className="link--text">More</span>
                        </Link>
                    </li>
                    {user ? (
                        <li className="link-list-item link-list-item--newpost" >
                            <Link className="link" to={ROUTES.NEWPOST} aria-label="Newpost">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faPlus} /></span>
                                <span className="link--text">New Post</span>
                            </Link>
                        </li>) : (
                        <li className="link-list-item link-list-item--newpost" >
                            <Link className="link" to={ROUTES.LOGIN} aria-label="Newpost">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faSignOutAlt} /></span>
                                <span className="link--text">Log In</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div >
        </>
    )
}
