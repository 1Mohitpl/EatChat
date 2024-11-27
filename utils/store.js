import {configureStore} from "@reduxjs/toolkit";
import Cartslice from "./cartslice";
import Cart from "../Src/Components/Cart";


const Store = configureStore ({       // it will craete slice of the store
   reducer : {
    cart : Cartslice,
   }
});

export default Store;