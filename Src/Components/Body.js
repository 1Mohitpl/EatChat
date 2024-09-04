import { RestraurentList } from "../config";
import RestaurantCard from "./RestraurantCard";
import { useState } from "react";


function filterData(searchText,restraurants) {

    const result =  restraurants.filter((abc) => abc.info.name.includes(searchText));
     return result;
  }

const Body = () => {
    // const searchTxt = "kfc"  // this is how created varibale in normla javascript it is hardcoded value,
    // seachText is a local varivable 
    const [restraurants, setRestraurants] = useState(RestraurentList);
    const [searchText, setSearchText] = useState(""); // to create state variable
    return (
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
            const data = filterData(searchText,restraurants);
            setRestraurants(data);
        }}
        >Search</button>
    
      </div>

     
       <div className="Restraulist">
       {restraurants.map((Restraurent)=>{
         return <RestaurantCard {...Restraurent.info} key={Restraurent.info.id}/>
       })}
       </div>
       </>
     );
   
   };

   export default Body;


   