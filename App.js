import React from "react";
import ReactDOM from "react-dom/client";
import logo from './imgs/applogo.png';

const Title = () => (
  <a href="/">
    <img 
  className="logo" 
       src={logo}/>
</a>
);



const Header = () => (
  <div className="header">
    <Title />
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

const Body = () => {
  return <h4>Body</h4>;
};

const Footer = () => {
  return <h4>Footer</h4>;
};

const AppLayout = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
