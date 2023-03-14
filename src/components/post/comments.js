import { useState } from 'react';
import { v4 as uuidV4 } from "uuid"
import { Link } from 'react-router-dom';
import Resizer from "react-image-file-resizer";
import { usePost } from '../../context/postProvider';
import { useUser } from '../../context/userProvider';
import UploadPreview from '../newpost/uploadPreview';
import ProgressModal from '../newpost/progressModal';
import { uploadFileToStorage } from '../../services/resizeService';
import CommentPost from './commentPost';

export default function PostComments({ comments, postId, author }) {
  const [comment, setComment] = useState("")
  const [filePreviw, setFilePreviw] = useState([])
  const [subfiles, setSubfiles] = useState([])
  const [subfilesName, setSubfilesName] = useState([])
  const [pgModal, setpgModal] = useState(false)

  const { user: loggedInuser } = useUser()
  const { addComment } = usePost()

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 640, 480, "JPEG", 100, 0, (uri) => resolve(uri), "file");
    });

  const handleFileUpload = async (e) => {
    if (!e.target.files.length) return;
    if (subfiles.length === 4) return;
    const file = e.target.files[0]
    const resizeImage = await resizeFile(file);
    setFilePreviw(prevFile => [...prevFile, URL.createObjectURL(resizeImage)])
    const filename = uuidV4()
    setSubfiles(prevFiles => [...prevFiles, resizeImage])
    setSubfilesName(prevFilename => [...prevFilename, filename])
  }
  const handleFileCross = (name) => {
    const index = filePreviw.indexOf(name)
    setFilePreviw(filePreviw.filter(item => item !== name))
    subfiles.splice(index, 1)
    subfilesName.splice(index, 1)
  }
  const handelSubmit = async (e) => {
    let files = [];
    // setUploading(true)
    setpgModal(true)
    for (let i = 0; i < subfiles.length; i++) {
      console.log("in loop");
      const fileurl = await uploadFileToStorage(subfiles[i], `/file/${loggedInuser?.username}/${postId}/${subfilesName[i]}`)
      files.push(fileurl)
    }

    const data = {
      _id: uuidV4(),
      comment,
      files,
      fileNames: subfilesName,
      fileNumber: subfiles.length,
      user: {
        _id: loggedInuser._id,
        username: loggedInuser.username,
        fullName: loggedInuser.fullName
      }
    }
    e.preventDefault()
    addComment(postId, data, author)
    setComment("")
    setpgModal(false)
  }

  return (
    <>
      <div className="post__comments">
        <div>
          <UploadPreview files={filePreviw} onChange={handleFileCross} />
        </div>
        <div className="post__comments__add-com">

          <Link to={`/user/${loggedInuser?.username}`} className="post__side" >
            <img className="post__pimg" src={loggedInuser?.displayImg.profileImg} alt="profile" />
          </Link>
          <div className="post__comments__add-com-main">
            <textarea value={comment} onInput={(e) => setComment(e.target.value)} className="post__comments__add-com-input" type="text" placeholder="Reply..." />
            <div className="post__comments__add-com-foot">
              <label className="u-icon">
                <i className="far fa-image"></i>
                <input id="addcomment-input" type="file" style={{ opacity: 0, position: "absolute", left: "-99999px" }} onChange={handleFileUpload} />
              </label>
              <button className="btn btn--grey" onClick={(e) => handelSubmit(e)} >Reply</button>
            </div>
          </div>
        </div>

        {pgModal ? <ProgressModal open={pgModal} onClose={() => setpgModal(false)} /> : <></>}
        {comments && comments.length ? comments.map((comment, index) => (
          <div key={index}>
            <CommentPost key={index} comment={comment} postId={postId} />
          </div>
        )) : ""}

      </div>

    </>
  );
}

