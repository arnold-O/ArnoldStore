import { createSlice } from "@reduxjs/toolkit";



const productSlice = createSlice({

    
    name:"product",
    initialState: {
        products: []
    },


    reducers:{
        addProduct(state, action){

            const allproduct = action.payload

            state.products.push(allproduct)

        }
    }
    
})

export const { addProduct } =
productSlice.actions;

export default productSlice;