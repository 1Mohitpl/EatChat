import { RestraurentList } from "../config";
import RestaurantCard from "./RestraurantCard";

const Body = () => {
    const searchText = "kfc"  // this is how created varibale in normla javascript it is hardcoded value, 
    return (
        <>
      <div className="search-container"> 
       <input type="text" className="search-input" placeholder="Search" value={searchText}></input>
        <button className="search">Search</button>
      </div>

     
       <div className="Restraulist">
       {RestraurentList.map((Restraurent)=>{
         return <RestaurantCard {...Restraurent.info} key={Restraurent.info.id}/>
       })}
       </div>
       </>
     );
   
   };

   export default Body;