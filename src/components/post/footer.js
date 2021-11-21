import PropTypes from 'prop-types';

export default function Footer({ caption, username }) {
  // useEffect(() => {
  //   setNewCap(caption.replace('\n', '\r'))
  // }, [caption])
  return (
    <div className="post__footer">
      <span className="post__footer--name">{username}</span>
      <span className="post__footer--caption">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
