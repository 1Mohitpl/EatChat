import { img_cdn_url } from "../config";

const FoodCard = ({ card }) => {
  const {
    cloudinaryImageId = "",
    name = "Unknown Food",
    price = 0,
    ratings = {},
  } = card?.info || {};

  const imageUrl = cloudinaryImageId
    ? `${img_cdn_url}fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`
    : "https://via.placeholder.com/660";

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <span>
        <h4 className="font-bold">
          {ratings?.aggregatedRating?.rating || "N/A"}⭐
        </h4>
        <h4>{ratings?.aggregatedRating?.ratingCount || "No ratings"}</h4>
        <h4>₹{price / 100}</h4>
      </span>
    </div>
  );
};

export default FoodCard;
