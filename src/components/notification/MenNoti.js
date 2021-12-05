import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/userProvider';

export default function MenNoti({ noti }) {
    const { getProfileImg } = useUser()
    const [profileImg, setProfileImg] = useState()
    useEffect(() => {
        async function getImg() {
            const img = await getProfileImg(noti.user.username)
            setProfileImg(img?.displayImg.profileImg);
        }
        getImg()
    }, [])

    return (

        <div className="mennoti">
            <Link to={`/user/${noti.user.username}`} ><img className="mennoti__img" src={profileImg} alt="profile" /></Link>
            <div className="mennoti__con">
                <div className="mennoti__con__head">
                    <Link to={`/user/${noti.user.username}`} >{noti.user.fullName}</Link>
                    <Link to={`/user/${noti.user.username}`} >@{noti.user.username}</Link>
                </div>
                <div className="mennoti__con__mess">{noti.message}</div>
            </div>
        </div>
    )
}
