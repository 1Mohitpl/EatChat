import logo from "/imgs/applogo.png";

const Title = () => (
    <a href="/">
      <img className="logo" src={logo} />
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
  export  default Header;