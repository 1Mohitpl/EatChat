import UserContext from "../../utils/UserContext";
import { img_cdn_url } from "../config";
import { useContext } from "react";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  locality,
  areaName,
  costForTwo,                                        
  totalRatingsString,   
  avgRating, 
}) => {
    const {user} = useContext(UserContext);
  return (
    <div className="card">
      <img src= {img_cdn_url +
    cloudinaryImageId}/>
      <h3 className="font-bold text-xl">{name}</h3>
      <h4>{areaName}</h4>
      <span>
        <h4 className="decoration-slate-50">
          {/* <i className="fa-solid"></i> */}
         <h4 className="font-bold">{avgRating}</h4>  
        </h4>
        <h4>{totalRatingsString}</h4>
        <h4>{costForTwo}</h4>
        <h4>{locality}</h4>
        <h4 className="font-bold">{user.name} - {user.email}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;

