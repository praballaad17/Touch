import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TimeLineContext from '../context/timeline';
import LoggedInUserContext from '../context/logged-in-user';
import SearchBar from './leftbar/searchBar';
import Post from './post';
import ReactLoader from './loader';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';

export default function Timeline(props) {
  const data = (props.location && props.location.data) || {};
  const { setShow, loggedInUser, posts, loading, hasMore, error, setPosts, setPageNumber } = useContext(LoggedInUserContext);
  const [searchToggle, setSearchToggle] = useState(false)

  useEffect(() => {
    if (Object.keys(data).length !== 0 && data.constructor === Object)
      setPosts(prevPost => [data, ...prevPost])
  }, [])

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

  return (
    <TimeLineContext.Provider value={{ loggedInUser, posts, setPosts }}>
      <div className="container col-span-2">
        <div className="timeline__head">
          <div className="timeline__head--profile" onClick={() => setShow(true)}>
            <img className="link-list--proImg--small" src={loggedInUser?.displayImg.profileImg} onError={(e) => {
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
        {!posts.length && loading ? (
          <Skeleton count={2} width={640} height={500} />
        ) : (
          posts.map((content, index) => {
            if (posts.length === index + 1) {
              return <Post postref={lastPostRef} key={content?._id} content={content} />
            }
            else {
              return <Post key={content?._id} content={content} />
            }
          })
        )}
        <div>{loading && (
          <ReactLoader />
        )}</div>
        <div>{error && 'Error'}</div>
      </div>
    </TimeLineContext.Provider >
  );
}
