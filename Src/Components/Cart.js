import { useSelector } from "react-redux";
import FoodCard from "./Foodcard";

const Cart = () => {
  const carditems = useSelector((store) => store.cart.items);

  console.log("Cart Items:", carditems); // Debug Redux state

  return (
    <div>
      <h1 className="font-bold text-3xl">Cart - {carditems.length}</h1>
      <div className="cart-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {carditems.map((item, index) => (
          <FoodCard key={index} card={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;