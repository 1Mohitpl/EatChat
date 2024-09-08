import logo from "/imgs/applogo.png";
import { useState } from "react";


const loggedInUser = () =>{
  return false;
}

const Title = () => (
    <a href="/">
      <img className="logo" src={logo} />
    </a>
  );
  const Header = () => {
    // let title = "Eat&chat";
    // const [title, setTitle] = useState("Eat&Chat");
    const [islogin, setlogin] = useState(false);
    return (
    <div className="header">
      <Title />
     {/* <h1> {title}</h1>
     <button onClick={() => setTitle("foodVila" )}>click</button> */}
      <div className="nave-items">
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Cart</li>
          <li>careers</li>
        </ul>
      </div>
     {
        islogin? <button onClick={() => setlogin(false)}>Signout</button> : 
        <button  onClick={() => setlogin(true)}>LogIn</button>
     }

     
      
    </div>
  );
};
  export  default Header;


 