import logo from "/imgs/applogo.png";
import { useState } from "react";

const Title = () => (
    <a href="/">
      <img className="logo" src={logo} />
    </a>
  );
  const Header = () => {
    // let title = "Eat&chat";
    const [title, setTitle] = useState("Eat&Chat");
    return (
    <div className="header">
      <Title />
     <h1> {title}</h1>
     <button onClick={() => setTitle("foodVila" )}>click</button>
      <div className="nave-items">
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Cart</li>
          <li>careers</li>
        </ul>
      </div>
    </div>
  );
};
  export  default Header;