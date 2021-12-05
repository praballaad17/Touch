import { useEffect, useRef, useState } from 'react';
import Header from './header';
import Image from './image';
import { Link } from 'react-router-dom';
import Footer from './footer';
import { useUser } from '../../context/userProvider';


export default function Post({ content, postref, setProfile, photosCollection }) {
  const commentInput = useRef(null);
  const [profileImg, setProfileImg] = useState()
  const [user, setuser] = useState()
  const { getProfileImg, getUser } = useUser()
  const { caption, author, fileNumber, _id, files } = content

  useEffect(() => {
    async function effectgetUser() {
      const ruser = await getUser(author)
      setuser(ruser)
    }
    effectgetUser()
  }, [author])

  useEffect(() => {
    async function getimg() {
      const result = await getProfileImg(author)
      setProfileImg(result?.displayImg.profileImg)
    }
    getimg()

  }, [content])

  // const handlePay = () => {
  //   setPayModel(true)
  // }

  // const result = caption.charCodeAt(0)
  // console.log(caption, result);
  // components
  // -> header, image, actions (like & comment icons), footer, 
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
      </div>
    </div>
  );
}

