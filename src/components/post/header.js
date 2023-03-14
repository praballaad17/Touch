/* eslint-disable jsx-a11y/img-redundant-alt */
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { deletePostById } from '../../services/postServices';
import PostModal from './postModal';

export default function Header({ user, content }) {
  const [isModal, setModal] = useState(false)
  return (
    <div className="post__header">

      <Link to={`/user/${user?.username}`} className="post__header-info">
        <div className="u-bold post__header-name">{user?.fullName}</div>
        <p className="post__header-username">@{user?.username}</p>
      </Link>
      <div className="u-icon" onClick={(event) => { event.stopPropagation(); setModal(true) }}><FontAwesomeIcon icon={faEllipsisV} /></div>
      {isModal && <PostModal content={content} open={isModal} onClose={() => setModal(false)} />}
    </div>
  );
}
