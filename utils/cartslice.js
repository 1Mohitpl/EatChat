import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
    name : 'cart',
    initialState : {
        items : []
    },
    reducers: {
        addItem : (state, action) =>{
            state.items.push(action.payload);
        },

        removeitems : (state, action) =>{
            state.items.pop();
        },

        clearCart : (state) =>{
            state.items = [];
        }
    }
});

export const {addItem, removeitems, clearCart} = cartslice.actions;

export default cartslice.reducer;