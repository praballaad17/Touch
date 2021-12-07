import { useEffect, useState } from "react";
import { usePost } from "../../context/postProvider";
import { useUser } from "../../context/userProvider";

export default function PostFooter({ setShowC , postId, likes}) {
  const [liked, setLiked] = useState(false)
  const {user: loggedInUser, userId} = useUser()
  const {toggleLike, timeline, setTimeline} = usePost()
    
  useEffect(() => {
    if (likes.includes(userId)) {
      setLiked(true)
    }
  },[likes])

  const handleLike = (e) => {
    e.preventDefault()
    setLiked(prev => !prev)
    toggleLike(!liked,postId, loggedInUser?._id )
  
    if(!liked) {
      let chlikes = [...likes]
       chlikes.push(userId)
      setTimeline(prev => {
        let madeChange = false;
        const newTimeline = prev.map(item => {
          if(item._id === postId) {
            madeChange = true;
            return {
              ...item,
              likes: chlikes,
            }
          }
          return item
        })
        if (madeChange) return newTimeline
        else return prev
      })
    } else {
      setTimeline(prev => {
        let madeChange = false;
        const newTimeline = prev.map(item => {
          if(item._id === postId) {
            madeChange = true;
            return {
              ...item,
              likes: item.likes.filter(id => id !== userId),
            }
          }
          return item
        })
        if (madeChange) return newTimeline
        else return prev
      })
    }
    
  }

  return (
    <div className="post__footer">
      <div className="u-icon" onClick={handleLike} ><i className={`${!liked ? 'far' : 'fas u-color-pink' } fa-heart`}></i></div>
      <div className="u-icon" onClick={() => setShowC(prev => !prev)}><i className="far fa-comment"></i></div>
    </div>
  );
}

