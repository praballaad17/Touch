import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, Switch, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import SearchBar from './leftbar/searchBar';
import Post from './post';
import * as ROUTES from '../constants/routes';
import ReactLoader from './loader';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import { usePost } from '../context/postProvider';
import { useUser } from '../context/userProvider';
import ProtectedRoute from '../helpers/protected-route';
import FullImg from './post/fullImg';

export default function Timeline({ setShow, user }) {
  useEffect(() => {
    document.title = 'Home | Touch';
  }, []);
  const { user: loggedInUser } = useUser()
  const { getTimeline, timeline, loading, hasMore, pageNumber, setPageNumber, recievedPosts, addRecivedToTimeline, node, setNode } = usePost()
  const [searchToggle, setSearchToggle] = useState(false)
  // const [show, setShow] = useState(false) 

  useEffect(async () => {
    await getTimeline(user?.id)
  }, [pageNumber])

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

  const currentRef = useCallback(node => {
    // if (node) {
    //   node.scrollIntoView({ smooth: true })
    // }
  }, [node])

  return (
    <>
      {/* <Switch>
        <ProtectedRoute path={ROUTES.FULLIMG} user={user}  >
          <FullImg user={user} />
        </ProtectedRoute>
      </Switch> */}
      <div className="timeline">

        <div className="timeline__head">
          <div className="timeline__head--profile" onClick={() => setShow(true)}>
            <img className="link-list--proImg--small" src={loggedInUser?.displayImg?.profileImg} onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }} alt={loggedInUser?.username} />
          </div>
          {!searchToggle && <h3 className="heading-main">Home</h3>}
          {searchToggle && <div className="timeline__head--search">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => { setSearchToggle(false) }} />
            <SearchBar />
          </div>}
          <div className="timeline__head--searchbtn">
            <FontAwesomeIcon icon={faSearch} onClick={() => setSearchToggle(true)} />
          </div>
        </div>

        {recievedPosts.length ? (<div className="timeline__unseen" onClick={addRecivedToTimeline}>
          {recievedPosts.length} New Posts
        </div>) : (<></>)}

        {!timeline?.length && loading ? (
          <Skeleton count={2} width={640} height={500} />
        ) : (
          timeline?.map((content, index) => {
            if (timeline?.length === index + 1) {
              return (
                // <Link to={`/${user?.username}/${content?._id}`}>
                <Post key={index} postref={lastPostRef} key={content?._id} content={content} user={user} />
                // </Link>
              )
            }
            else {
              return (
                // <Link to={`/${user?.username}/${content?._id}`}>
                <Post key={index} postref={currentRef} content={content} user={user} />
                // </Link>
              )
            }
          })
        )}
        <div className="timeline__loading">
          {loading && (
            <ReactLoader />
          )}
        </div>
        {/* <div>{error && 'Error'}</div> */}
      </div>
    </>
  );
}
