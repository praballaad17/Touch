/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { toggleFollow } from '../../services/userServices';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import PIModal from './pimodal'
import FollowerModal from './followerModal';
import { useUser } from '../../context/userProvider';

export default function Header({
  photosCount,
  followerCount,
  setfollowerCount,
  user
}) {
  const { user: loggedInUser } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [ispiModal, setIspiModal] = useState(false)
  const [isfollowerModal, setIsfollowerModal] = useState(false)
  const [isfollowingModal, setIsfollowingModal] = useState(false)
  const { _id: profileUserId, fullName, followers, following, username: profileUsername, displayImg } = user
  const activeBtnFollow = loggedInUser?.username && loggedInUser?.username !== profileUsername;
  // console.log(displayImg);
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setfollowerCount(isFollowingProfile ? followerCount - 1 : followerCount + 1);
    await toggleFollow(isFollowingProfile, profileUserId, loggedInUser.id);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = () => {
      const isFollowing = followers.filter(item => item._id == loggedInUser.id)
      setIsFollowingProfile(!!isFollowing.length);
    };

    if (loggedInUser?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [loggedInUser?.username, profileUserId]);

  const handleProfileImg = () => {
    if (loggedInUser?.username === user?.username)
      setIspiModal(true)

    else return
  }

  return (
    <>
      <div className="profile__header">
        <div className="profile__header-imgbox">
          {profileUsername ? (
            <img
              onClick={handleProfileImg}
              className="profile__header-img"
              alt={`${fullName} profile picture`}
              src={displayImg && displayImg?.profileImg.length ? displayImg.profileImg : DEFAULT_IMAGE_PATH}
            // onError={(e) => {
            //   e.target.src = DEFAULT_IMAGE_PATH;
            // }}
            />
          ) : (
            <Skeleton circle height={150} width={150} count={1} />
          )}
        </div>

        <PIModal displayImgs={displayImg} open={ispiModal} onClose={() => setIspiModal(false)} />

        <div className="profile__header-info">
          <div className="profile__header-info-head">
            <p className="u-bold">@{profileUsername}</p>
            {activeBtnFollow && isFollowingProfile === null ? (
              <Skeleton count={1} width={60} height={32} />
            ) : (
              activeBtnFollow && (
                <button
                  className={`btn-follow ${isFollowingProfile ? 'btn-follow-f' : 'btn-follow-u'}`} type="button"
                  onClick={handleToggleFollow}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleToggleFollow();
                    }
                  }}
                >
                  {isFollowingProfile ? 'Unfollow' : 'Follow'}
                </button>
              )
            )}
          </div>
          <div className="profile__header-info-follow">
            {!followers || !following ? (
              <Skeleton count={1} width={500} height={24} />
            ) : (
              <>
                <p className="profile__header-info-follow-count">
                  <span className="u-bold">{photosCount}</span> photos
                </p>
                <p className="profile__header-info-follow-count" onClick={() => setIsfollowerModal(true)}>
                  <span className="u-bold">{followerCount}</span>
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </p>
                <FollowerModal open={isfollowerModal} loggedInUser={loggedInUser} onClose={() => setIsfollowerModal(false)} />
                <p className="profile__header-info-follow-count" onClick={() => setIsfollowingModal(true)}>
                  <span className="u-bold">{following?.length}</span> following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
          </div>
        </div>
      </div>

    </>
  );
}

