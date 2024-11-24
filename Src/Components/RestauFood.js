import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { img_cdn_url } from "../config";
import Shimmer from "./shimmer";
import useRestaurant from "../../utils/useRestaurant";

const RestauFood = () => {
  // how to read a dynamic url params
  // const params = useParams();   // you can write router param in this way too also
  // const {resid} = params;
  const { resid } = useParams(); // it is an hook, just an normal funtion
  // const [restaumenu, setrestaumenu] = useState({});

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=63007&catalog_qa=undefined&submitAction=ENTER" + resid
    );
    const json = await data.json();
    console.log(json);
  }

  const restaumenu = useRestaurant(resid);

  return (
    <div className="menucard">
    {/* <h1>restaurantId : {resid}</h1> */}
    {restaumenu && restaumenu.cards && restaumenu.cards.length > 2 ? (
      <>
        <div className="restauinfo">
          <img
            className="restauimage"
            src={
              img_cdn_url +
              restaumenu?.cards[2]?.card?.card?.info?.cloudinaryImageId
            }
          />
          <h1 className="Cardname">
            {restaumenu?.cards[2]?.card?.card?.info?.name}
          </h1>
          <h3>{restaumenu?.cards[2]?.card?.card?.info?.areaName}</h3>
          <span className=" font-bold ">
            {restaumenu?.cards[2]?.card?.card?.info?.avgRatingString}
          </span>
          <h3>{restaumenu.cards[2]?.card?.card?.info?.city}</h3>
          <h3>{restaumenu.cards[2]?.card?.card?.info?.costForTwoMessage}</h3>
          <h3>{restaumenu.cards[2]?.card?.card?.info?.locality}</h3>
        </div>
        <div>
          <h1 className="font-bold ">menu</h1>
          <ul>
            {restaumenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[3]?.card?.card?.itemCards?.map(
              (item) => (
                <li key={item.card.info.id}>{item.card.info.name}</li>
              )
            )}
          </ul>
        </div>
      </>
    ) : (
      <Shimmer />
    )}
  </div>
);
};

export default RestauFood;