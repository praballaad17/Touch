import { useEffect, useRef, useState } from 'react';
import Header from './header';
import Image from './image';
import Footer from './footer';
import { getuserDisplayImgs } from '../../services/userServices';


export default function Post({ content, postref, setProfile, photosCollection, userProfileImg }) {
  const commentInput = useRef(null);
  const [profileImg, setProfileImg] = useState()
  // const [payModel, setPayModel] = useState()

  const { caption, author, fileNumber, _id, files } = content

  useEffect(() => {
    async function getimg() {
      const result = await getuserDisplayImgs(author)
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
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div ref={postref} className="post">
      <Header content={content} username={author} profileImg={profileImg} setProfile={setProfile} photosCollection={photosCollection} />
      {content ? (
        <>
          <Image caption={author} files={files} fileNumber={fileNumber} postId={_id} />
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

