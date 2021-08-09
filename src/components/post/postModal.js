import React, { useContext } from 'react'
import { useState } from 'react'
import ReactDom from 'react-dom'
import { Link, useHistory, useLocation } from 'react-router-dom'
import LoggedInUserContext from '../../context/logged-in-user'
import { deletePostById } from '../../services/postServices'
import usePhotos from '../../hooks/use-photos'
import { DASHBOARD } from '../../constants/routes'

export default function PostModal({ open, content, onClose, setProfile, photosCollection }) {
    const [profileImg, setProfileImg] = useState()
    const { user } = useContext(LoggedInUserContext)
    const { pathname } = useLocation()

    if (!open) return null

    const unfollow = async () => {
        // try {
        //     await toggleFollow(true, content.author, user._id)
        //     window.location = `/user/${user.username}`
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const deletePost = () => {
        deletePostById(content._id).then(() => {

            if (pathname == "/") {
                window.location = pathname
            }
            else
                setProfile({ photosCollection: photosCollection.filter(item => item._id != content._id) })
        }).catch(e => {
            console.log(e);
        })
    }

    return ReactDom.createPortal(
        <>
            <div className="modal-layout" onClick={onClose}></div>
            <div className="modal-box">
                <ul className="modal-box__list">
                    {content.author != user.username && <li className="modal-box__item" onClick={unfollow} >Unfollow</li>}
                    <li className="modal-box__item" ><Link target="_blanck" to={`/user/${content?.author}`} >Share</Link></li>
                    {content.author == user.username && < li className="modal-box__item" onClick={deletePost} >Delete Post</li>}
                    <li className="modal-box__item" onClick={onClose}>Cencel</li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
