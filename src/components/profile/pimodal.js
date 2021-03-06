import React from 'react'
import ReactDom from 'react-dom'
import { useUser } from '../../context/userProvider'
import { deleteImgInStorage, imageResize, uploadFileToStorage } from '../../services/resizeService'
import { updateProfileImg, removeProfileImg } from '../../services/userServices'

export default function PIModal({ open, onClose, displayImgs }) {
    const { user: loggedInUser, setActiveUser } = useUser()
    if (!open) return null


    const removeImage = async () => {
        if (!displayImgs?.profileImg.length) return
        try {
            setActiveUser({ ...loggedInUser, displayImg: { profileImg: "" } })
            // setUser({ ...user, displayImg: { profileImg: "" } })
            onClose()
            deleteImgInStorage(`/file/${loggedInUser?.username}/displayImg/profileImg`)
            await removeProfileImg(loggedInUser.username)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0]
        console.log(file.size / 1024);

        if ((file.size / 1024) > 800) {
            console.log("more");
            const resizeImage = await imageResize(file)
            setActiveUser({ ...loggedInUser, displayImg: { profileImg: URL.createObjectURL(resizeImage) } })
            // setUser({ ...user, displayImg: { profileImg: URL.createObjectURL(resizeImage) } })
            onClose()
            const imageUrl = await uploadFileToStorage(resizeImage, `/file/${loggedInUser?.username}/displayImg/profileImg`)
            console.log(imageUrl);
            try {
                const result = await updateProfileImg(loggedInUser.username, imageUrl)
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log(file.size / 1024);
            setActiveUser({ ...loggedInUser, displayImg: { profileImg: URL.createObjectURL(file) } })
            // setUser({ ...user, displayImg: { profileImg: URL.createObjectURL(file) } })
            onClose()
            const imageUrl = await uploadFileToStorage(file, `/file/${loggedInUser?.username}/displayImg/profileImg`)
            console.log(imageUrl);
            try {
                const result = await updateProfileImg(loggedInUser.username, imageUrl)
                console.log(result);
            } catch (error) {
                console.log(error);
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
                    <li className="modal-box__item u-text-red-bold" onClick={removeImage} >Remove Image</li>
                    <li className="modal-box__item" onClick={onClose}>Cancel</li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}
