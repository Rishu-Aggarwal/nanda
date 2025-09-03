import {configureStore} from "@reduxjs/toolkit";
import SliderReducer from "./features/SliderSlice";
import CategoryReducer from "./features/CategorySlice";
import ProductReducer from "./features/ProductSlice";
const Store=configureStore({
    reducer:{
        slider:SliderReducer,
        category:CategoryReducer,
        product:ProductReducer
    },
});
export default Store;