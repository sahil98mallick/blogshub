import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../API/AxiosInstance";

const initialState = {
    blogs: [],
    loading: false,
    latestpost: [],
    singleblog: {},
    categorywiseblogdata: []
}

export const fetchblogs = createAsyncThunk(
    'allblogs',
    async () => {
        try {
            const response = await instance.get("allblog")
            return response?.data?.data
        } catch (error) {
            console.error('Error fetching allblogs:', error);
            throw error;
        }
    }
);
export const fetchlatestposts = createAsyncThunk(
    'fetchlatestpost',
    async () => {
        try {
            const response = await instance.get("letest-post")
            return response?.data?.data
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
);

export const fetchsingleblogs = createAsyncThunk(
    'fetchsingleblogdetails',
    async (blogid) => {
        try {
            const response = await instance.get(`blogdetails/${blogid}`)
            return response?.data?.data
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
);
export const categorywiseblogs = createAsyncThunk(
    'fetchcategorywiseposts',
    async (catid) => {
        try {
            const response = await instance.get(`category/post/${catid}`)
            return response?.data?.data
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
);
const BlogSlice = createSlice({
    name: "Blogs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // All Blog
        builder.addCase(fetchblogs.fulfilled, (state, action) => {
            state.loading = false
            state.blogs = action.payload
        })
        builder.addCase(fetchblogs.pending, (state, action) => {
            state.loading = true
            state.blogs = [];
        })
        builder.addCase(fetchblogs.rejected, (state, action) => {
            state.loading = false
            state.blogs = "Try again"
        });
        // Fetch Latest Posts
        builder.addCase(fetchlatestposts.fulfilled, (state, action) => {
            state.loading = false
            state.latestpost = action.payload
        });
        builder.addCase(fetchlatestposts.pending, (state, action) => {
            state.loading = true
            state.latestpost = [];
        });
        builder.addCase(fetchlatestposts.rejected, (state, action) => {
            state.loading = false
            state.latestpost = "Try again"
        });
        // Fetch Single Blogs
        builder.addCase(fetchsingleblogs.fulfilled, (state, action) => {
            state.singleblog = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchsingleblogs.pending, (state, action) => {
            state.loading = true
            state.singleblog = {};
        });
        builder.addCase(fetchsingleblogs.rejected, (state, action) => {
            state.loading = false
            state.singleblog = "Try again"
        });
        // Fetch Category Wise Blogs
        builder.addCase(categorywiseblogs.fulfilled, (state, action) => {
            state.loading = false;
            state.categorywiseblogdata = action.payload;

        });
        builder.addCase(categorywiseblogs.pending, (state, action) => {
            state.loading = true
            state.categorywiseblogdata = [];
        });
        builder.addCase(categorywiseblogs.rejected, (state, action) => {
            state.loading = false
            state.categorywiseblogdata = "Try again"
        });
    }
})


export default BlogSlice.reducer