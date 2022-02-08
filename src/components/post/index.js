import { useEffect, useState } from 'react';
import Header from './header';
import Image from './image';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../context/userProvider';
import PostFooter from './footer';
import PostComments from './comments';


export default function Post({ content, postref, setProfile, photosCollection }) {
  const [showC, setShowC] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const [user, setuser] = useState()
  const { getUser, users } = useUser()
  const history = useHistory()

  const { caption, author, fileNumber, _id, files, comments, likes } = content


  useEffect(() => {
    getUser(author)
  }, [author])

  useEffect(() => {
    users.map(item => {
      if (item.username === author) {
        setuser(item)
        setProfileImg(item.displayImg.profileImg)
      }
    })
  }, [users, author])

  const handleOpenPost = (event) => {
    console.log(event.target, event.currentTarget);
    // if (event.target != event.currentTarget) {
    //   return event.stopPropagation();
    // }
    console.log("stop");
    history.push(`/${user?.username}/${_id}`)
  }

  const linkToUser = (event) => {
    event.stopPropagation();
    history.push(`/user/${user?.username}`)
  }




  return (
    <div style={{ "zIndex": "10" }} onClick={handleOpenPost}>
      {/* <Link to={`/${user?.username}/${_id}`}> */}
      <div ref={postref} className="post" >
        <Link onClick={linkToUser} to={`/user/${user?.username}`} className="post__side" >
          <img className="post__pimg" src={profileImg} alt="profile" />
        </Link>
        <div className="post__main">
          <Header linkToUser={linkToUser} content={content} user={user} setProfile={setProfile} photosCollection={photosCollection} />
          <div className="post__text">
            {caption}
          </div>
          <Image files={files} author={author} fileNumber={fileNumber} postId={_id} />
          <PostFooter setShowC={setShowC} postId={_id} likes={likes} />
          {showC ? <PostComments comments={comments} postId={_id} /> : <></>}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}

