import { img_cdn_url } from "../config";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  locality,
  areaName,
  costForTwo,
  cuisines,                                        
  totalRatingsString,   
  avgRating,  
}) => {
  return (
    <div className="card">
      <img src= {img_cdn_url +
    cloudinaryImageId}/>
      <h2>{name}</h2>
      <h5>{cuisines}</h5>
      <h6>{areaName}</h6>
      <span>
        <h4>
          <i className="fa-solid fa-star"></i>
          {avgRating}
        </h4>
        <h4>{totalRatingsString}</h4>
        <h4>{costForTwo}</h4>
        <h4>{locality}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;

