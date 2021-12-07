import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { Route, useHistory, useParams } from 'react-router'
import { DASHBOARD } from '../../constants/routes'
import { usePost } from '../../context/postProvider'

export default function FullImg() {
    const [post, setPost] = useState()
    const history = useHistory()
    const { username, postId, fileNumber } = useParams()
    const { getPostFromTimeline } = usePost()
    const [counter, setCounter] = useState(fileNumber - 1)
    
    useEffect(() => {
        async function getpost() {
            const post = await getPostFromTimeline(postId)
            console.log(post);
            setPost(post)
        }
        getpost()
    }, [postId])
    
    const increase = () => {
        if (counter === post?.fileNumber - 1) return null
        setCounter(counter + 1)
    }
    
    const decrease = () => {
        if (counter === 0) return null
        setCounter(counter - 1)
    }
    
    return ReactDom.createPortal(

        <div className="fullImg" >
            <div className="fullImg__icon fullImg__icon-time" onClick={() => history.goBack()}><i className="fas fa-times"></i></div>
            {counter !== 0 ? <div className="fullImg__icon fullImg__icon-left" onClick={decrease}><i class="fas fa-arrow-left"></i></div> : <></>}
            <div className="fullImg__imgbox"><img src={post?.files[counter]} alt='full-img' /></div>
            {counter < post?.fileNumber - 1 ? (<div className="fullImg__icon fullImg__icon-right" onClick={increase}><i class="fas fa-arrow-right"></i></div>) : <></>}
            <div className="fullImg__icon fullImg__icon-more"><i className="fas fa-times" ></i></div>
        </div>
        ,
        document.getElementById("fullimg"))
}
