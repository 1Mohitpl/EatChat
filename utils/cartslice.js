
import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
    name : 'cart',
    initialState : {
        items : []
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            state.items.push({
              info: {
                imageId : newItem.imageId || "",
                name: newItem.name || "Unknown Food",
                price: newItem.price || 0,
                ratings: newItem.ratings || {},
              },
            });
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