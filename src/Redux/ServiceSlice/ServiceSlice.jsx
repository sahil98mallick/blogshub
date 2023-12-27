import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../API/AxiosInstance";
import { toast } from "react-toastify";
const initialState = {
    services: [],
    serviceloading: false,
    teams: []
}

// Servies API 
export const servicesprocess = createAsyncThunk(
    'api/services',
    async () => {
        try {
            const response = await instance.get("service");
            return response?.data?.data
        } catch (error) {
            toast.error(error.response?.data)
        }
    }
)
// Servies API 
export const teammemberprocess = createAsyncThunk(
    'api/teams',
    async () => {
        try {
            const response = await instance.get("team");
            return response?.data?.TeamMember
        } catch (error) {
            toast.error(error.response?.data)
        }
    }
)
const ServiceSlice = createSlice({
    name: "allservices",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        // Services
        builder.addCase(servicesprocess.pending, (state, action) => {
            state.serviceloading = true
        });
        builder.addCase(servicesprocess.fulfilled, (state, action) => {
            state.services = action.payload;
            state.serviceloading = false
        });
        builder.addCase(servicesprocess.rejected, (state, action) => {
            state.serviceloading = false;
            state.services = null
        });
        // Team Member
        builder.addCase(teammemberprocess.pending, (state, action) => {
            state.serviceloading = true
        });
        builder.addCase(teammemberprocess.fulfilled, (state, action) => {
            state.teams = action.payload;
            state.serviceloading = false
        });
        builder.addCase(teammemberprocess.rejected, (state, action) => {
            state.serviceloading = false;
            state.teams = null
        });
    })
})

export default ServiceSlice.reducer