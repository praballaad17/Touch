import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { getuserDisplayImgs } from '../../services/userServices';

export default function Post({ content, postref, setProfile, photosCollection }) {
  const commentInput = useRef(null);
  const [profileImg, setProfileImg] = useState()
  const handleFocus = () => commentInput.current.focus();

  const { files, caption, author } = content

  useEffect(async () => {
    const { displayImg } = await getuserDisplayImgs(author)
    setProfileImg(displayImg.profileImg);
  }, [])

  // const result = caption.charCodeAt(0)
  // console.log(caption, result);
  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div ref={postref} className="post">
      <Header content={content} username={content.author} profileImg={profileImg} setProfile={setProfile} photosCollection={photosCollection} />
      <Image files={files} caption={content.author} />
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

Post.propTypes = {
  content: PropTypes.shape({
    author: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
    caption: PropTypes.string.isRequired,
    // docId: PropTypes.string.isRequired,
    // userLikedPhoto: PropTypes.bool.isRequired,
    // likes: PropTypes.array.isRequired,
    // comments: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired
  })
};
