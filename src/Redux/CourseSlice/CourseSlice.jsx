import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../API/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    allcourses: [],
    loading: false,
    applyCourses: {}
}
export const fetchlallcourses = createAsyncThunk(
    'fetchlatestpost',
    async () => {
        try {
            const response = await instance.get("course")
            return response?.data?.Courses
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
);

export const addCourses = createAsyncThunk(
    'addcourses',
    async ({ courseid, coursedata }) => {
        try {
            const response = await instance.post(`course/apply/${courseid}`, coursedata)
            toast.success(response?.data?.message)
            return response?.data
        } catch (error) {
            toast.success(error?.response?.data?.message)
            throw error;
        }
    }
);
const CourseSlice = createSlice({
    name: "Course",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {

        // All Courses
        builder.addCase(fetchlallcourses.fulfilled, (state, action) => {
            state.loading = false
            state.allcourses = action.payload
        })
        builder.addCase(fetchlallcourses.pending, (state, action) => {
            state.loading = true
            state.allcourses = [];
        })
        builder.addCase(fetchlallcourses.rejected, (state, action) => {
            state.loading = false
            state.allcourses = "Try again"
        });

        // Add Courses
        builder.addCase(addCourses.pending, (state, action) => {
            state.loading = true
            state.applyCourses = [];
        })
        builder.addCase(addCourses.fulfilled, (state, action) => {
            state.loading = false
            state.applyCourses = action.payload
            const existingCourses = JSON.parse(localStorage.getItem("UserCourses")) || [];
            existingCourses.push(action.payload?.data);
            localStorage.setItem("UserCourses", JSON.stringify(existingCourses));
        })
        builder.addCase(addCourses.rejected, (state, action) => {
            state.loading = false
            state.applyCourses = "Try again"
        });
    })
})

export default CourseSlice.reducer