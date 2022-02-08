import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '.'
import { usePost } from '../../context/postProvider'

export default function FullPost({user}) {
    const {postId} = useParams()
    const [post, setPost] = useState()
    const { getPostFromTimeline } = usePost()
 
    useEffect(() => {
        async function getpost() {
            const post = await getPostFromTimeline(postId)
            setPost(post)
        }
        getpost()
    }, [postId]) 

    console.log(post);

    return (
        <div className="fullpost">
          {post && <Post user={user} content={post} /> }
        </div>
    )
}
