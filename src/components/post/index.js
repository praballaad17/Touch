import { useContext, useEffect, useRef, useState } from 'react';
import Header from './header';
import Image from './image';
import Footer from './footer';
import LoggedInUserContext from '../../context/logged-in-user';
import {getuserDisplayImgs} from '../../services/userServices'

export default function Post({ content, postref, setProfile, photosCollection, userProfileImg }) {
  const commentInput = useRef(null);
  const [profileImg, setProfileImg] = useState()
  const [payModel, setPayModel] = useState()
  const { loggedInUser } = useContext(LoggedInUserContext)
  const handleFocus = () => commentInput.current.focus();

  const { caption, author, paid, fileNumber, _id } = content

  useEffect(async () => {
    if (userProfileImg) {
      setProfileImg(userProfileImg)
    }
    if (author === loggedInUser?.username) 
      setProfileImg(loggedInUser?.displayImg.profileImg)
    
      else {
        const result = await getuserDisplayImgs(author)
        console.log(result);
        setProfileImg(result?.displayImg.profileImg)
        
      }
  })
  

  const handlePay = () => {
    setPayModel(true)
  }

  // const result = caption.charCodeAt(0)
  // console.log(caption, result);
  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div ref={postref} className="post">
      <Header content={content} username={author} profileImg={profileImg} setProfile={setProfile} photosCollection={photosCollection} />
      {content ? (
        <>
          <Image caption={author} fileNumber={fileNumber} postId={_id} />
        </>
      ) : (
        <div>not found</div>
      )
      }

      {/* <Image files={files} caption={content.author} /> */}
      {/* <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      /> */}
      <Footer caption={caption} username={author} />
      {/* <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      /> */}
    </div>
  );
}

