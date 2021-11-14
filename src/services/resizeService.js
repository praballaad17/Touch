import Resizer from "react-image-file-resizer";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const imageResize = async (file) => {
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(file, 640, 480, "JPEG", 100, 0, (uri) => resolve(uri), "file");
        });

    if (file) {
        return await resizeFile(file);
    }
    else return
}

export const uploadFileToStorage = async (file, reffile) => {
    const storageRef = ref(storage, reffile);

    const uploadTask = (file, storageRef) =>
        new Promise((resolve) => {
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then(async (snapshot) => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        resolve(url)
                    })
            })
        });

    return await uploadTask(file, storageRef)
}

export const deleteImgInStorage = (reffile) => {
    const desertRef = ref(storage, reffile);
    // Delete the file
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log("deleted succes");
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log("unsuccess", error);
    });
}