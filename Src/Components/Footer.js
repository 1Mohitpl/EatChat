import { useContext } from "react";
import UserContext from "../../utils/UserContext";

const Footer = () => {
  const {user} = useContext(UserContext); 

    return (
      <h1 className="font-bold text-lime-800">{user.name} - 
       {user.email}</h1>
    )
  };

  export default Footer;