import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../Src/config";

const useRestaurant =  (resid) => {

   const [restaurant, setallRestaurant] = useState(null);
   
   // get the data from API
   useEffect( () =>{
    getRestaurantInfo();
}, [])
 

async  function getRestaurantInfo() {
 const data =  await fetch (FETCH_MENU_URL + resid);
 const json = await data.json();
 console.log(json.data);
 setallRestaurant(json.data);
}

// return the restaurent data
  return restaurant;
};

export default useRestaurant;