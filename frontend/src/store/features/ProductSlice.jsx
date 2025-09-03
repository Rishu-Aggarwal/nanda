import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products: [],
    status: "idle",
    error: null,
    search_products: [],
    search_status: "idle",
    search_error: null,
    product_search_page: [],
    product_search_page_status: "idle",
    product_search_page_error: null
};
export const productsFetch = createAsyncThunk(
    "product/get-all",
    async () => {
        const { data } = await axios.get("http://localhost:8080/api/v2/nanda/product/get-all");
        return data;
    }
);
export const searchProductPage = createAsyncThunk("product/search/page", async (search_str) => {
    const { data } = await axios.get(`http://localhost:8080/api/v2/nanda/product/search/${search_str}`);
    return data;
});
export const searchProducts = createAsyncThunk("product/search", async (search_str) => {
    const { data } = await axios.get(`http://localhost:8080/api/v2/nanda/product/search/${search_str}`);
    return data;
});

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.status = "suceeded";
                state.products = action.payload?.products;
            })
            .addCase(productsFetch.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })
            .addCase(searchProducts.pending, (state) => {
                state.search_status = "loading";
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.search_status = "suceeded";
                state.search_products = action.payload?.products;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.search_status = "error";
                state.search_error = action.error.message;
            })
            .addCase(searchProductPage.pending, (state) => {
                state.product_search_page_status = "loading";
            })
            .addCase(searchProductPage.fulfilled, (state, action) => {
                state.product_search_page_status = "suceeded";
                state.product_search_page = action.payload?.products;
            })
            .addCase(searchProductPage.rejected, (state, action) => {
                state.product_search_page_status = "error";
                state.product_search_page_error = action.error.message;
            });
    }
});
export default ProductSlice.reducer;