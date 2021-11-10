import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { faImage, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UploadPreview from './uploadPreview'
import LoggedInUserContext from '../../context/logged-in-user'
import usePhotos from '../../hooks/use-photos'
import { DASHBOARD } from '../../constants/routes'
import { postByUsername, resizeImage } from '../../services/postServices';
import ProgressModal from './progressModal';
// import sharp from 'sharp'

export default function Newpost() {
    const { user: loggedInUser } = useContext(LoggedInUserContext);
    const { setPosts } = usePhotos()
    const [selectedFiles, setSelectedFiles] = useState()
    const [filePreviw, setFilePreviw] = useState([])
    const [files, setFiles] = useState([])
    const [paid, setPaid] = useState(false)
    const [caption, setCaption] = useState("")
    const [price, setPrice] = useState()
    const [progress, setProgress] = useState("")
    const [pgModal, setpgModal] = useState(false)
    let [result, setResult] = useState();
    let history = useHistory()

    const handleFileUpload = async (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0]
        let form = new FormData()
        form.append('image', file)
        const resizeimage = await resizeImage(form)
        setFilePreviw(prevFile => [...prevFile, resizeimage])
        // let reader = new FileReader();
        // // Convert the file to base64 text
        // reader.readAsDataURL(resizeimage);
        // // on reader load somthing...
        // reader.onload = () => {
        //     // Make a fileInfo Object
        //     const baseURL = reader.result;
        // }
        setFiles(prevFiles => [...prevFiles, resizeimage])

    }

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const handleFileCross = (name) => {
        setFilePreviw(filePreviw.filter(item => item != name))
        const index = filePreviw.indexOf(name)
        setFiles(files.splice(index, 1))
    }

    const progressFn = {
        onUploadProgress: (progressEvent) => {
            let progressper = Math.round(progressEvent.loaded / progressEvent.total * 100) + "%";
            console.log(progressper);
            setProgress(progressper)
        }
    }

    const isPaid = () => {
        setPaid(!paid)
    }

    const handleSubmit = async () => {
        try {
            setpgModal(true)
            const { data } = await postByUsername(files, caption, loggedInUser.username, paid, price, progressFn)
            // const res = await postByUsername(formData, loggedInUser.username)
            console.log(data);
            setPosts(prevPost => [...prevPost, data])
            history.push({
                pathname: DASHBOARD,
                data
            })
        } catch (error) {
            console.log(error.response);
        }
    }


    return (
        <>
            <div className="newpost__head">
                <h3 className="heading-tertiary">New Post</h3>
                <div>
                    <FontAwesomeIcon className={`newpost__lock`} onClick={isPaid} icon={faLock} />
                    <button className="btn btn--grey" onClick={handleSubmit}>Post</button>
                </div>
            </div>
            <div className="newpost__main">
                <div>
                    <UploadPreview files={filePreviw} onChange={handleFileCross} />
                </div>
                <textarea className="newpost__input-text" placeholder="compose new post..." onChange={handleCaption} />
                <label className="newpost__media">
                    <FontAwesomeIcon icon={faImage} />
                    <input type="file" style={{ opacity: 0, position: "absolute", left: "-99999px" }} onChange={handleFileUpload} />
                </label>
                <input type="text" placeholder="Price You Select" onChange={(e) => setPrice(e.target.value)} />
            </div>

            {pgModal && <ProgressModal open={pgModal} progress={progress} onClose={() => setpgModal(false)} />}
        </>
    )
}
