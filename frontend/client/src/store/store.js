import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";





export default  configureStore({
    reducer: {
        product: ProductSlice.reducer ,
        
    }
})