import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Skeleton from 'react-loading-skeleton';
import Post from '../post';
import { getUserPhotosByUsername } from '../../services/postServices';
import { getuserDisplayImgs } from '../../services/userServices';
import { NEWPOST } from '../../constants/routes';
import TimeLineContext from '../../context/timeline';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
    displayImgs: {}
  };
  const [{ profile, photosCollection, followerCount, displayImgs }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username)
      const sortedPost = photos.sort((a, b) => {
        const dateA = new Date(a.date), dateB = new Date(b.date)
        return dateB - dateA
      })
      const { displayImg } = await getuserDisplayImgs(user.username)
      dispatch({ profile: user, photosCollection: sortedPost, followerCount: user.followers.length, displayImgs: displayImg });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <TimeLineContext.Provider value={{ user, posts: photosCollection, setPosts: dispatch }}>
        <Header
          photosCount={photosCollection ? photosCollection.length : 0}
          profile={profile}
          followerCount={followerCount}
          displayImgs={displayImgs}
          setProfile={dispatch}
        />
        {!photosCollection ? (
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        ) : (
          <>
            {photosCollection.length ?
              (photosCollection.map((content) => <Post key={content._id} content={content} profileImg={displayImgs.profileImg} setProfile={dispatch} photosCollection={photosCollection} />)
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

Profile.propTypes = {
  user: PropTypes.shape({
    date: PropTypes.number,
    email: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    _id: PropTypes.string,
    username: PropTypes.string
  })
};
