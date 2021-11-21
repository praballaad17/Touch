import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Resizer from "react-image-file-resizer";
import { v4 as uuidV4 } from "uuid"
import UploadPreview from './uploadPreview'
import { TIMELINE } from '../../constants/routes'
import { postByUsername } from '../../services/postServices';
import ProgressModal from './progressModal';
import { uploadFileToStorage } from '../../services/resizeService';
import { useUser } from '../../context/userProvider';
import { usePost } from '../../context/postProvider';
import { useUserPost } from '../../context/userPostProvider';

export default function Newpost() {
    useEffect(() => {
        document.title = 'New Post | Touch';
        setPostId(uuidV4())
    }, []);

    const { user: loggedInUser } = useUser()
    const { setTimeline } = usePost()
    const { addToAllProfilePost } = useUserPost()
    const [filePreviw, setFilePreviw] = useState([])
    const [uploading, setUploading] = useState(false)
    const [subfiles, setSubfiles] = useState([])
    const [subfilesName, setSubfilesName] = useState([])
    const [caption, setCaption] = useState("")
    const [progress, setProgress] = useState("")
    const [pgModal, setpgModal] = useState(false)
    const [postId, setPostId] = useState()
    let history = useHistory()


    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(file, 640, 480, "JPEG", 100, 0, (uri) => resolve(uri), "file");
        });

    const handleFileUpload = async (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0]
        const resizeImage = await resizeFile(file);
        setFilePreviw(prevFile => [...prevFile, URL.createObjectURL(resizeImage)])
        const filename = uuidV4()
        setSubfiles(prevFiles => [...prevFiles, resizeImage])
        setSubfilesName(prevFilename => [...prevFilename, filename])
    }

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const handleFileCross = (name) => {
        const index = filePreviw.indexOf(name)
        setFilePreviw(filePreviw.filter(item => item !== name))
        subfiles.splice(index, 1)
        subfilesName.splice(index, 1)
    }

    const progressFn = {
        onUploadProgress: (progressEvent) => {
            let progressper = Math.round(progressEvent.loaded / progressEvent.total * 100) + "%";
            console.log(progressper);
            setProgress(progressper)
        }
    }


    const handleSubmit = async () => {
        let files = [];
        setUploading(true)
        setpgModal(true)
        for (let i = 0; i < subfiles.length; i++) {
            const fileurl = await uploadFileToStorage(subfiles[i], `/file/${loggedInUser?.username}/${postId}/${subfilesName[i]}`)
            files.push(fileurl)
        }

        try {
            const { data } = await postByUsername(files, subfilesName, postId, caption, loggedInUser.username, progressFn)
            // const res = await postByUsername(formData, loggedInUser.username)
            console.log(data);
            setTimeline(prevPost => [data, ...prevPost])
            addToAllProfilePost(loggedInUser?.username, data)
            setUploading(false)
            history.push({
                pathname: TIMELINE,
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
            </div>

            {pgModal && <ProgressModal open={pgModal} progress={progress} onClose={() => setpgModal(false)} />}
        </>
    )
}
