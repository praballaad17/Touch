import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UploadPreview from './uploadPreview'
import LoggedInUserContext from '../../context/logged-in-user'
import usePhotos from '../../hooks/use-photos'
import { DASHBOARD } from '../../constants/routes'
import { postByUsername } from '../../services/postServices';

export default function Newpost() {
    const { user: loggedInUser } = useContext(LoggedInUserContext);
    const { setPosts } = usePhotos()
    const [selectedFiles, setSelectedFiles] = useState()
    const [filePreviw, setFilePreviw] = useState([])
    const [files, setFiles] = useState([])
    const [caption, setCaption] = useState("")
    let [result, setResult] = useState();
    let history = useHistory()

    const handleFileUpload = (e) => {
        if (!e.target.files.length) return;

        setFilePreviw(prevFile => [...prevFile, URL.createObjectURL(e.target.files[0])])
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(e.target.files[0]);
        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            const baseURL = reader.result;
            setFiles(prevFiles => [...prevFiles, baseURL])
        }
    }

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const handleFileCross = (name) => {
        setFilePreviw(filePreviw.filter(item => item != name))
        const index = filePreviw.indexOf(name)
        setFiles(files.splice(index, 1))
    }

    const progress = {
        onUploadProgress: (progressEvent) => {
            let progressper = Math.round(progressEvent.loaded / progressEvent.total * 100) + "%";
            console.log(progressper);
        }
    }

    const handleSubmit = async () => {
        try {
            const { data } = await postByUsername(files, caption, loggedInUser.username, progress)
            // const res = await postByUsername(formData, loggedInUser.username)
            setPosts(data)
            history.push(DASHBOARD)
        } catch (error) {
            console.log(error.response);
        }
    }


    return (
        <>
            <div className="newpost__head">
                <h3 className="heading-tertiary">New Post</h3>
                <button className="btn btn--grey" onClick={handleSubmit}>Post</button>
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
            </div>

        </>
    )
}
