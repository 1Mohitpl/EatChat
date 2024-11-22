import {configureStore} from "@reduxjs/toolkit";
import Cartslice from "./cartslice";
import cart from "../Src/Components/Cart";


const store = configureStore ({       // it will craete slice of the store
   reducer : {
    cart : Cartslice,
   }
});

export default store;