import { useEffect, useState } from 'react';
import Header from './header';
import Image from './image';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/userProvider';
import PostFooter from './footer';
import PostComments from './comments';


export default function Post({ content, postref, setProfile, photosCollection }) {
  const [showC, setShowC] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const [user, setuser] = useState()
  const { getUser, users } = useUser()
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


  return (
    <div ref={postref} className="post">
      <Link to={`/user/${user?.username}`} className="post__side" >
        <img className="post__pimg" src={profileImg} alt="profile" />
      </Link>
      <div className="post__main">
        <Header content={content} user={user} setProfile={setProfile} photosCollection={photosCollection} />
        <div className="post__text">
          {caption}
        </div>
        <Image files={files} author={author} fileNumber={fileNumber} postId={_id} />
        <PostFooter setShowC={setShowC} postId={_id} likes={likes}  />
        {showC ? <PostComments comments={comments} postId={_id} /> : <></>}
      </div>
    </div>
  );
}

