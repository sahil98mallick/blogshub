import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../API/AxiosInstance";
const initialState = {
    blogcategory: [],
    loading: false
}
export const fetchblogcategory = createAsyncThunk(
    'category',
    async () => {
        try {
            const response = await instance.get("showallcategory")
            return response?.data?.data
        } catch (error) {
            throw error.response?.data
        }
    }
)
const CategorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(fetchblogcategory.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchblogcategory.fulfilled, (state, action) => {
            state.blogcategory = action.payload;
            state.loading = false
        });
        builder.addCase(fetchblogcategory.rejected, (state, action) => {
            state.blogcategory = "Error Found"
        });
    })
})

export default CategorySlice.reducer