import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useUser } from "../../context/userProvider";
import Image from "./image";
import PostModal from "./postModal";


export default function CommentPost({ comment, postId }) {
    const [profileImg, setProfileImg] = useState()
    const [isModal, setModal] = useState(false)
    const { user, fileNumber} = comment
    const {usersProfileImgs, getProfileImg} = useUser()

    useEffect(() => {
        getProfileImg(user?.username)
      }, [comment])

      useEffect(() => {
        usersProfileImgs.map(item => {
          if (item.user.username === user.username) {
            setProfileImg(item.displayImg.profileImg)
            // setProfileImg(item.displayImg.profileImg)
          }
        })
      }, [comment, user, usersProfileImgs])
      console.log(isModal);
    return (
        <div className="comment__post">
            <img className="comment__post-img" src={profileImg} alt="comment_profile-img" />

            <div className="comment__post-main">
                	<div className="comment__post-main-con">
                    <div className="comment__post-main-con-head">
                      <Link to={`/user/${user.username}`} className="u-bold">{user.fullName}</Link>
                      <Link to={`/user/${user.username}`}>&nbsp;@{user.username}</Link>
                    </div>
                    <div className="u-icon" onClick={() => setModal(true)}><i className="fas fa-ellipsis-h"></i></div>
                    {isModal && <PostModal postId={postId} content={comment} open={isModal} isComment={true} onClose={() => setModal(false)} />}
                  </div>
                {comment.comment.length ? <div className="comment__post-text">{comment.comment}</div>:<></>}
                {comment.files && comment.files.length ? <Image files={comment.files} author={user.username} fileNumber={fileNumber} postId={user._id} />:<></>}
            </div>
        </div>
    )
}