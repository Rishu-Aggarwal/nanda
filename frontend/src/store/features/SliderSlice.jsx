import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    sliders:[],
    success:"idle",
    error:null
};
export const fetchSliders=createAsyncThunk(
    "sliders/fetch-all",
    async()=>{
        const {data}=await axios.get(`http://localhost:8080/api/v2/nanda/slider/get-all`);
        return data;
    }
);
const SliderSlice=createSlice({
    name:"slider",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSliders.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchSliders.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.sliders=action.payload?.sliders
        })
        .addCase(fetchSliders.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        });
    }
});
export default SliderSlice.reducer;