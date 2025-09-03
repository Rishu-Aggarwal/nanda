import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    categories:[],
    status:"idle",
    error:null,
    search_categories:[],
    search_status:"idle",
    search_error:null
};
export const fetchCategories=createAsyncThunk("categories/fetch-all",async()=>{
    const {data}=await axios.get("http://localhost:8080/api/v2/nanda/category/get-all");
    return data;
});
export const searchCategories=createAsyncThunk("categories/search",async(search_str)=>{
    const {data}=await axios.get(`http://localhost:8080/api/v2/nanda/category/search/${search_str}`);
    return data;
});
const CategorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategories.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.categories=action.payload?.categories;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message
        })
        .addCase(searchCategories.pending,(state)=>{
            state.search_status="search_loading";
        }).addCase(searchCategories.fulfilled,(state,action)=>{
            state.search_status="search_suceeded";
            state.search_categories=action.payload?.categories;
        })
        .addCase(searchCategories.rejected,(state,action)=>{
            state.search_status="search_error";
            state.search_error=action.error.message;
        });
    }
});
export default CategorySlice.reducer;