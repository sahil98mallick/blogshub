import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../API/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    blogcomments: [],
    commentloading: false,

}
export const fetchblogcomments = createAsyncThunk(
    'fetchblogcomments',
    async (blogid) => {
        try {
            const response = await instance.get(`comment/${blogid}`)
            return response?.data?.post?.comment
        } catch (error) {
            console.error('Error fetching allblogs:', error);
            throw error;
        }
    }
);
export const addBlogComment = createAsyncThunk(
    'addBlogComment',
    async ({ blogId, commentData }) => {
        try {
            const response = await instance.post(`blog/${blogId}/comment/create`, commentData);
            toast.success(response?.data?.message)
            return response?.data;
        } catch (error) {
            console.error('Error adding blog comment:', error);
            toast.success(error.response?.data?.message)
            throw error;
        }
    }
);
const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(fetchblogcomments.pending, (state, action) => {
            state.commentloading = true
        });
        builder.addCase(fetchblogcomments.fulfilled, (state, action) => {
            state.commentloading = false;
            state.blogcomments = action.payload?.comments
        });
        builder.addCase(fetchblogcomments.rejected, (state, action) => {
            state.commentloading = false;
            state.blogcomments = [];
        })
        builder.addCase(addBlogComment.pending, (state, action) => {
            state.commentloading = true
        });
        builder.addCase(addBlogComment.fulfilled, (state, action) => {
            state.commentloading = false;
            state.blogcomments.push(action.payload.data);
        });
        builder.addCase(addBlogComment.rejected, (state, action) => {
            state.commentloading = false
        });
    })
})

export default CommentSlice.reducer