import logo from "/imgs/applogo.png";
import { useState } from "react";
import { Link } from "react-router-dom";


const Title = () => (
  <a href="/">
      <img className="logo" src="https://themes.muffingroup.com/be/recipes3/wp-content/uploads/2022/12/berecipes3.svg" />
    </a>
  
  );
  const Header = () => {
    // let title = "Eat&chat";
    // const [title, setTitle] = useState("Eat&Chat");
    const [islogin, setlogin] = useState(false);
    return (
    <div className="header">
      {/* <h3>Eat&chat</h3> */}
      <Title />
     {/* <h1> {title}</h1>
     <button onClick={() => setTitle("foodVila" )}>click</button> */}
      <div className="nave-items">
        <ul>

        <Link to= "/">
        <li>Home</li>
         </Link>
         <Link to= "/Contact">
           <li>Contact</li>

         </Link>
          
         <Link to ="/about">
         <li>About</li>
         </Link>
          <li>Cart</li>
          <li>careers</li>
        </ul>
      </div>
     <div className="log-btn">
     {islogin? <button onClick={() => setlogin(false)}>Signout</button> : 
     <button  onClick={() => setlogin(true)}>LogIn</button>
     }
     </div>

     
      
    </div>
  );
};
  export  default Header;


 