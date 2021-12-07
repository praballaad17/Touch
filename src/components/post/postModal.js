import React from 'react'
import ReactDom from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { deletePostById } from '../../services/postServices'
import { deleteImgInStorage } from '../../services/resizeService'
import { usePost } from '../../context/postProvider'
import { useUser } from '../../context/userProvider'
import { useUserPost } from '../../context/userPostProvider'

export default function PostModal({ open, content, onClose, isComment, postId }) {
    const { user: loggedInUser } = useUser()
    const { timeline, setTimeline, deleteComment } = usePost()
    const { profilePost, removeFromAllProfilePost } = useUserPost()
    const { pathname } = useLocation()
    if (!open) return null
    console.log(content , postId);
    const unfollow = async () => {
        // try {
        //     await toggleFollow(true, content.author, user._id)
        //     window.location = `/user/${user.username}`
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const notLikedPost = () => {
        localStorage.setItem("dontLikePost", JSON.stringify({ postId: content._id, author: content.author }))
        // setPosts(posts.filter(item => item._id != content._id))
        onClose()
    }
    const deletePost = async () => {

        try {
            if (content.files.length) {
                for (let i = 0; i < content.fileNumber; i++) {
                    deleteImgInStorage(`/file/${content?.author}/${content._id}/${content?.fileNames[i]}`)
                }
            }

            // if (pathname == "/home" || pathname == '/') {
            setTimeline(timeline.filter(item => item._id != content._id))
            onClose()
            // }
            // else {
            removeFromAllProfilePost(loggedInUser?.username, content._id)
            // setProfilePost(profilePost.filter(item => item._id != content._id))
            // setuserPost(userPost.filter(item => item._id != content._id))
            // }
            await deletePostById(content._id)
        }
        catch (e) {
            alert("Error while deleting the Post, generally check your internet");
            console.log(e, content);
            if (pathname == "/") {
                setTimeline(prevPost => [...prevPost, content])
                // window.location = pathname
            }
            else {
                // setuserPost(prevPost => [...prevPost, content])
            }

        }
    }

    const handleDeleteComment = async () => {
        await deleteComment(postId, content._id)
        onClose()
    }
    console.log(isComment);
    return ReactDom.createPortal(
        <>
            <div className="modal-layout" onClick={onClose}></div>
            <div className="modal-box">
                <ul className="modal-box__list">
                    <li className="modal-box__item"><Link className="u-text-decor-none" target="_blanck" to={`/user/${content?.author}`} >Share</Link></li>
                    {/* {content.author != user.username && <li className="modal-box__item u-text-red-bold" onClick={unfollow} >Unfollow</li>} */}
                    {content.author == loggedInUser.username && !isComment && < li className="modal-box__item u-text-red-bold" onClick={deletePost} >Delete Post</li>}
                    {isComment && < li className="modal-box__item u-text-red-bold" onClick={handleDeleteComment} >Delete Comment</li>}
                    {content.author != loggedInUser.username && !isComment &&  <li className="modal-box__item u-text-red-bold" onClick={notLikedPost} >I don't link this Post</li>}
                    <li className="modal-box__item" onClick={onClose}>Cancel</li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
