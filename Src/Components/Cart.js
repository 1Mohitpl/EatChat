import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./Foodcard";
import { clearCart } from "../../utils/cartslice";

const Cart = () => {
  const carditems = useSelector((store) => store.cart.items);

 const dispatch = useDispatch();

 const handleClearCart = ()=>{
      dispatch(clearCart());
 }

  return (
    <div>
      <h1 className="font-bold text-3xl">Cart - {carditems.length}</h1>
      <button className="bg-green-200  p-2, m-5 rounded"  onClick={()=> handleClearCart()}>Clear-Cart</button>
      <div className="cart-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {carditems.map((item, index) => (
          <FoodCard key={index} card={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;