import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "../BlogSlice/BlogSlice";
import AuthSlice from "../AuthSlice/AuthSlice";
import CategorySlice from "../CategorySlice/CategorySlice";
import CommentSlice from "../CommentSlice/CommentSlice";
import CourseSlice from "../CourseSlice/CourseSlice";
import ServiceSlice from "../ServiceSlice/ServiceSlice";

export const Store = configureStore({
    reducer: {
        Blog: BlogSlice,
        Auth: AuthSlice,
        Category: CategorySlice,
        Comment: CommentSlice,
        Course: CourseSlice,
        Service: ServiceSlice,
    }
})