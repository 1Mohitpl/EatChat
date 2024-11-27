import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { img_cdn_url } from "../config";
import Shimmer from "./shimmer";
import useRestaurant from "../../utils/useRestaurant";
import { addItem } from "../../utils/cartslice";
import { useDispatch } from "react-redux";

const RestauFood = () => {
  // how to read a dynamic url params
  // const params = useParams();   // you can write router param in this way too also
  // const {resid} = params;
  const { resid } = useParams(); // it is an hook, just an normal funtion
  // const [restaumenu, setrestaumenu] = useState({});

const restaumenu = useRestaurant(resid);

const dispatch = useDispatch()

const normalizeItem = (info) => ({
  cloudinaryImageId: info.cloudinaryImageId || "",
  name: info.name || "Unknown Food",
  price: info.price || 0,
  ratings: info.ratings || {},
});

const addFooditem = (item) => {
  const normalizedData = normalizeItem(item.card.info);
  dispatch(addItem(normalizedData));
};


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
          <span className=" font-bold " >
            <h4>{restaumenu?.cards[2]?.card?.card?.info?.avgRatingString} ⭐ ratings</h4>
          </span>
          <h3>{restaumenu.cards[2]?.card?.card?.info?.city}</h3>
          <h3>{restaumenu.cards[2]?.card?.card?.info?.costForTwoMessage}</h3>
          <h3>{restaumenu.cards[2]?.card?.card?.info?.locality}</h3>
        </div>


        <div className="p-5">
          <h1 className="font-bold ">menu</h1>
          <ul>
            {restaumenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[3]?.card?.card?.itemCards?.map(
              (item) => (
                <li className="gap-y-1" key={item.card.info.id}>{item.card.info.name}  - {" "}
                <button className="p-1 bg-lime-300" onClick={() => addFooditem (item)}>Add</button>
                </li>
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