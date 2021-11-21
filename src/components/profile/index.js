import { useState, useRef, useCallback, useEffect } from 'react';
import Header from './header';
import Skeleton from 'react-loading-skeleton';
import Post from '../post';
import { NEWPOST } from '../../constants/routes';
import ReactLoader from '../loader';
import { useUserPost } from '../../context/userPostProvider';
import { useUser } from '../../context/userProvider';

export default function Profile({ user }) {
  const [followerCount, setfollowerCount] = useState()
  const { profilePost, loading, setPageNumber, hasMore } = useUserPost()
  const { user: loggedInUser } = useUser()

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
    setfollowerCount(user?.followers.length)
  }, [user])



  return (
    <>
      {user && <Header
        photosCount={profilePost ? profilePost.length : 0}
        user={user}
        setfollowerCount={setfollowerCount}
        followerCount={followerCount}
      />}
      {!profilePost.length && loading ? (
        <ReactLoader />
      ) : (
        <>
          {profilePost.length ?
            (profilePost.map((content, index) => {
              if (profilePost.length === index + 1) {
                return <Post postref={lastPostRef} key={content?._id} content={content} userProfileImg={user?.displayImg.profileImg} />
              }
              else {
                return <Post key={content?._id} content={content} userProfileImg={user?.displayImg.profileImg} />
              }
            })
            ) : (
              loggedInUser?.username == user?.username ?
                (<div className="nopost">
                  <div className="nopost-no heading-main">No Post</div>
                  <div className="nopost-to"><a href={NEWPOST}>Click Here</a> To Post</div>
                </div>) :
                (<div className="nopost">
                  <div className="nopost-no heading-main">No Post</div>
                  {/* <div className="nopost-to"><a href={NEWPOST}>Click Here</a> To Post</div> */}
                </div>)

            )}
          <div>
            {loading && (
              <ReactLoader />
            )}</div>
        </>)}
    </>
  );
}
;
