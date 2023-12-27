import axios from "axios"
const baseURL = "https://restapinodejs.onrender.com/api";

// Login
export const loginfunction = async (data) => {
    try {
        return await axios.post(`${baseURL}/login`, data)
    } catch (error) {
        console.log(error.message);
    }
}

// Fetch all blogs
export const fetchallblogs = async () => {
    try {
        return await axios.get(`${baseURL}/allBlog`)
    } catch (error) {
        console.log(error.message);
    }
}
export const addcoursesdetails = async (id, data) => {
    try {
        return await axios.post(`${baseURL}/course/apply/${id}`, data)
    } catch (error) {
        console.log(error.message);
    }
}