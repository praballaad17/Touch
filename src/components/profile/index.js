import { useReducer, useEffect, useContext, useState, useRef, useCallback } from 'react';
import Header from './header';
import Skeleton from 'react-loading-skeleton';
import Post from '../post';
import { NEWPOST } from '../../constants/routes';
import TimeLineContext from '../../context/timeline';
import LoggedInUserContext from '../../context/logged-in-user';
import useProfilePost from '../../hooks/useProfilePost';

export default function Profile({ user, setUser }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [followerCount, setfollowerCount] = useState()
  const { logginUser } = useContext(LoggedInUserContext)
  const { posts, loading, hasMore, error, setPosts } = useProfilePost(user, logginUser?._id, pageNumber);


  const observer = useRef()
  const lastPostRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prePage => prePage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
     function getProfileInfoAndPhotos() {
      setfollowerCount(user?.followers.length)
    }
    getProfileInfoAndPhotos();
  }, [user, logginUser]);
  
  return (
    <>
      <TimeLineContext.Provider value={{ user, setUser, userPost: posts, setuserPost: setPosts }}>
        {user && <Header
          photosCount={posts ? posts.length : 0}
          user={user}
          setUser={setUser}
          setfollowerCount={setfollowerCount}
          followerCount={followerCount}
        />}
        {!posts || loading ? (
          <Skeleton count={1} width={640} height={500} className="mb-5" />
        ) : (
          <>
            {posts.length ?
              (posts.map((content, index) => {
                if (posts.length === index + 1) {
                  return <Post postref={lastPostRef} key={content?._id} content={content} userProfileImg={user?.displayImg.profileImg} />
                }
                else {
                  return <Post key={content?._id} content={content} userProfileImg={user?.displayImg.profileImg} />
                }
              })
                // posts.map((content) => <Post key={content._id} content={content} profileImg={displayImgs.profileImg} setProfile={dispatch} photosCollection={photosCollection} />)
              ) : (
                <div className="nopost">
                  <div className="nopost-no heading-main">No Post</div>
                  <div className="nopost-to"><a href={NEWPOST}>Click Here</a> To Post</div>
                </div>
              )} </>)}
      </TimeLineContext.Provider>
    </>
  );
}
;
