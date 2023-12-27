import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../API/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    user: localStorage.getItem("UserDetails") ? JSON.parse(localStorage.getItem("UserDetails")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false,
    error: null,
    isauthenticate: false,
}
// Register API

// Login API
export const loginprocess = createAsyncThunk(
    'auth/login',
    async (logindata) => {
        try {
            const response = await instance.post('login', logindata)
            // toast.success(response?.data?.message);
            return response?.data
        } catch (error) {
            toast.error(error.response?.data?.message)
            // throw error.response?.message
        }
    }
)
// Logout Function

const AuthSlice = createSlice({
    name: "Auth/Login",
    initialState,
    reducers: {
        logoutUser: (state, { payload }) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("UserDetails");
            toast.warn("Logout Successfully");
        },
    },
    extraReducers: ((builder) => {
        // Login
        builder.addCase(loginprocess.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(loginprocess.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.status === 200) {
                state.user = action.payload?.user;
                state.token = action.payload?.token
                localStorage.setItem("UserDetails", JSON.stringify(state.user))
                localStorage.setItem("token", JSON.stringify(state.token))
                toast.success(action.payload?.message)
            }
        });
        builder.addCase(loginprocess.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.status === 400) {
                toast.error(action.payload?.message)
            }
        });
    })
})

export const { logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer