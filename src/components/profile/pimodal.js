import React, { useContext } from 'react'
import { useState } from 'react'
import ReactDom from 'react-dom'
import { useHistory } from 'react-router'
import LoggedInUserContext from '../../context/logged-in-user'
import TimeLineContext from '../../context/timeline'
import { resizeImage } from '../../services/postServices'
import { updateProfileImg, removeProfileImg } from '../../services/userServices'

export default function PIModal({ open, onClose, displayImgs }) {

    const [profileImg, setProfileImg] = useState()
    const { user, setUser } = useContext(TimeLineContext);
    const { loggedInUser, setActiveUser } = useContext(LoggedInUserContext);
    let history = useHistory()
    if (!open) return null

    console.log(user)

    const removeImage = async () => {
        if (!displayImgs?.profileImg.length) return
        try {
            setActiveUser({ ...loggedInUser, displayImg: { profileImg: "" } })
            setUser({ ...user, displayImg: { profileImg: "" } })
            onClose()
            await removeProfileImg(user.username)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0]
        console.log(file.size / 1024);
        if ((file.size / 1024) > 800) {
            let form = new FormData()
            form.append('image', file)
            const resizeimage = await resizeImage(form)
            console.log(resizeimage.length / 1024);
            setActiveUser({ ...loggedInUser, displayImg: { profileImg: resizeimage } })
            setUser({ ...user, displayImg: { profileImg: resizeimage } })
            onClose()
            const result = await updateProfileImg(user.username, resizeimage)
        }
        else {
            console.log(file.size / 1024);
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(e.target.files[0]);
            // on reader load somthing...
            reader.onload = async () => {
                // Make a fileInfo Object
                const baseURL = reader.result;
                setActiveUser({ ...loggedInUser, displayImg: { profileImg: baseURL } })
                setUser({ ...user, displayImg: { profileImg: baseURL } })
                onClose()
                try {
                    const result = await updateProfileImg(user.username, baseURL)
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }

            }
        }

    }

    return ReactDom.createPortal(
        <>
            <div className="modal-layout" onClick={onClose}></div>
            <div className="modal-box">
                <div className="modal-box__heading heading-black">Change Profile Photo</div>
                <ul className="modal-box__list">
                    <label className="newpost__media">
                        <li className="modal-box__item">
                            Upload Image
                            <input type="file" style={{ opacity: 0, position: "absolute", left: "-99999px" }} onChange={handleSubmit} />
                        </li>
                    </label>
                    <li className="modal-box__item" onClick={removeImage} >Remove Image</li>
                    <li className="modal-box__item" onClick={onClose}>Cancel</li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
