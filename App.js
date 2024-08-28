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


const RestrauntCard = () => {
     return (
     <div className="card">
     <img  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/13/3c643624-5dd2-4bc4-814c-7ae12f237bda_276763.JPG"/>
     <h2>Kwality walls ice-cream</h2>
     <h3>Mahanbati</h3>
     <h4>4.7 stars </h4>
     </div>
  );
};

const Body = () => {
  return (
       <div>
          <RestrauntCard />
       </div>
  );
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
