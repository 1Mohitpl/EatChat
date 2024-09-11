import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { img_cdn_url } from "../config";
import Shimmer from "./shimmer";

const RestauFood =  () =>{
    // how to read a dynamic url params 
    // const params = useParams();   // you can write router param in this way too also  
    // const {resid} = params;  
    const { resid } =  useParams();   // it is an hook, just an normal funtion
    const [restaumenu, setrestaumenu] = useState({});

  useEffect( () =>{
       getRestaurantInfo();
  }, [])
    

  async  function getRestaurantInfo() {
    const data =  await fetch (
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=" + resid);

    const json = await data.json();
    console.log(json.data);
    setrestaumenu(json.data);
  }
    return (
  <div>
    {/* <h1>restaurantId : {resid}</h1> */}
    {restaumenu && restaumenu.cards && restaumenu.cards.length > 2 ? (
      <div className="restauinfo">
        <h1 className="name">{restaumenu?.cards[2]?.card?.card?.info?.name}</h1>
        <img className="restauimage" src={img_cdn_url + restaumenu?.cards[2]?.card?.card?.info?.cloudinaryImageId} />
        <h3>{restaumenu.cards[2].card.card.info.areaName}</h3>
        <h3>{restaumenu.cards[2].card.card.info.avgRating}</h3>
        <h3>{restaumenu.cards[2].card.card.info.city}</h3>
      </div>
    ) : (
      <Shimmer />
    )}
  </div>
);

}

export default RestauFood;