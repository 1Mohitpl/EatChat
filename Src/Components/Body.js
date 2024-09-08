import { RestraurentList } from "../config";
import RestaurantCard from "./RestraurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";


function filterData(searchText,restraurants) {

    const result =  restraurants.filter((rastaurant) => rastaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
     return result;
  }

const Body = () => {
    // const searchTxt = "kfc"  // this is how created varibale in normla javascript it is hardcoded value,
    // seachText is a local varivable 
    const [allRestaurants, setallRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState(""); // to create state variable

    useEffect(()=>{
     //api
     getRestraurants();
    }, []);

    async function getRestraurants() {
       const data = await fetch ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
       const json = await data.json();
       console.log(json);
       //optional chaining
       setallRestaurants(json?.data?.cards[2]?.card?.card?.
        gridElements?.infoWithStyle?.restaurants);

        setfilteredRestaurants(json?.data?.cards[2]?.card?.card?.
          gridElements?.infoWithStyle?.restaurants);
};
  
if(!allRestaurants) 
  return null;
// if(filteredRestaurants?.length === 0) return (
//   <h1>No records</h1>
// )

 return allRestaurants?.length === 0 ?( <Shimmer /> ): (
        <>
      <div className="search-container"> 
       <input type="text" className="search-input"
        placeholder="Search" 
         value={searchText}
         onChange={(e)=>{
          setSearchText(e.target.value);
             
         }}
       ></input>
        <button className="search"
        onClick={()=>{
            // need to filter the data form data
            const data = filterData(searchText, allRestaurants);
            setfilteredRestaurants(data);
        }}
        >Search</button>
    
      </div>

     
       <div className="Restraulist">
       {filteredRestaurants.map((Restraurent)=>{
         return <RestaurantCard {...Restraurent.info} key={Restraurent.info.id}/>
       })}
       </div>
       </>
     );
   
   };

   export default Body;


   