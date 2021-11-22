import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import SearchBar from './leftbar/searchBar';
import Post from './post';
import ReactLoader from './loader';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import { usePost } from '../context/postProvider';
import { useUser } from '../context/userProvider';

export default function Timeline({ setShow }) {
  useEffect(() => {
    document.title = 'Home | Touch';
  }, []);
  const { user: loggedInUser } = useUser()
  const { getTimeline, timeline, loading, hasMore, pageNumber, setPageNumber } = usePost()
  const [searchToggle, setSearchToggle] = useState(false)
  // const [show, setShow] = useState(false) 

  useEffect(async () => {
    console.log("in effect");
    await getTimeline()
  }, [pageNumber])

  const observer = useRef()
  const lastPostRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      console.log(hasMore);
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prePage => prePage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
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
      {!timeline?.length && loading ? (
        <Skeleton count={2} width={640} height={500} />
      ) : (
        timeline?.map((content, index) => {
          if (timeline?.length === index + 1) {
            return <Post key={index} postref={lastPostRef} key={content?._id} content={content} />
          }
          else {
            return <Post key={index} content={content} />
          }
        })
      )}
      <div className="timeline__loading">{loading && (
        <ReactLoader />
      )}</div>
      {/* <div>{error && 'Error'}</div> */}
    </div>
  );
}
