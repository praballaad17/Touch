import axios from 'axios';
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/post";

export const postByUsername = async (files, fileNames, postId, caption, username, progressFn) => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/${username}`,
            { files, fileNames, postId, caption }, progressFn);
        return { data };
    } catch (err) {
        console.log(err);
    }
};

export const getPostById = async (postId) => {
    try {
        const { data } = await axios.get(`${apiEndpoint}/posts/${postId}`);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const resizeImage = async (file) => {
    try {
        const responce = await axios.post(`${apiUrl}/resize/file`,
            file, {
            headers: {
                'Content-Type': 'multipart/form-data; ',
            }
        });
        return responce.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const retrivePostByUsername = async (username) => {
    try {
        const response = await axios.get(`${apiEndpoint}/${username}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};


export const getUserPhotosByUsername = async (username, pageNumber, limit) => {
    console.log(":in post services");
    try {
        const response = await axios.get(`${apiEndpoint}/user-posts/${username}`,
            {
                params: { page: pageNumber, limit: limit }
            });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const retrivePostByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiEndpoint}/userId/${userId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const getPost = async (userId, page, limit) => {
    try {
        const response = await axios.get(`${apiEndpoint}/get-timeline-post/${userId}`, {
            params: { page: page, limit: limit }
        });
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const deletePostById = async (postId) => {
    try {
        const response = await axios.delete(`${apiEndpoint}/delete/${postId}`);
        return response.data;
    } catch (err) {
        return err.response.data.error;
    }
};

export const deleteCommentByPostId = async (postId, commentId) => {
    try {
        const response = await axios.delete(`${apiEndpoint}/delete-comment/${postId}/${commentId}`);
        return response.data;
    } catch (err) {
        return err.response.data.error;
    }
};