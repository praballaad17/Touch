import React from 'react'
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { faBookmark, faCog, faIdCard, faList, faSignOutAlt, faTimes, faUniversity, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from '../services/authenticationServices';
import ReactDom from 'react-dom'
import { DEFAULT_IMAGE_PATH } from '../constants/paths';

export default function ToggleBar({ show, onClose, loggedInUser }) {
    if (!show) return null
    return ReactDom.createPortal(
        <>
            <div className="togglebar-overlay" onClick={onClose}></div>
            <div className="toggle-sidebar">
                <div className="toggle-sidebar__close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <ul>

                    {loggedInUser ? (
                        <>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link u-display-phone" to={`/user/${loggedInUser?.username}`} aria-label="Profile">
                                    <img className="link-list--proImg" src={loggedInUser?.displayImg.profileImg} onError={(e) => {
                                        e.target.src = DEFAULT_IMAGE_PATH;
                                    }} alt={loggedInUser?.username} />
                                    <div className="toggle-sidebar__name">{loggedInUser?.fullName}</div>
                                    <div className="toggle-sidebar__username">@{loggedInUser?.username}</div>
                                    <div className="toggle-sidebar__counts">
                                        <div>{loggedInUser?.followers?.length} followers</div>
                                        <div>{loggedInUser?.following?.length} following</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={`/user/${loggedInUser?.username}`} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faUser} /></span>
                                    <span className="toggle-sidebar__link--text">Profile</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Bookmarks</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faList} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">List</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faCog} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Settings</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Your Cards</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item">
                                <Link className="toggle-sidebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faUniversity} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Add Bank</span>
                                </Link>
                            </li>
                            <li className="toggle-sidebar__item"
                                onClick={() => {
                                    logout();
                                    window.location = ROUTES.LOGIN
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        logout();
                                        window.location = ROUTES.LOGIN
                                    }
                                }}>
                                <div className="toggle-sidebar__link" >
                                    <span className="toggle-sidebar__link--icon">
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                    </span>
                                    <span className="toggle-sidebar__link--text">Log Out</span>
                                </div>
                            </li>
                        </>) : (
                        <li className="link-list-item link-list-item--newpost" >
                            <Link className="link" to={ROUTES.LOGIN} aria-label="Newpost">
                                <span className="link--icon">
                                    <FontAwesomeIcon icon={faSignOutAlt} /></span>
                                <span className="link--text">Log In</span>
                            </Link>
                        </li>
                    )
                    }                    </ul>
            </div>
        </>,
        document.getElementById("togglebar")
    )
}
