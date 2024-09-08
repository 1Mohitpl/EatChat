import { img_cdn_url } from "../config";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  locality,
  areaName,
  costForTwo,                                        
  totalRatingsString,   
  avgRating,  
}) => {
  return (
    <div className="card">
      <img src= {img_cdn_url +
    cloudinaryImageId}/>
      <h3>{name}</h3>
      <h4>{areaName}</h4>
      <span>
        <h4>
          {/* <i className="fa-solid"></i> */}
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

