import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <header className="Header">
      <div className="HeaderTitle">
        <h2>CryptoPortfolio</h2>
      </div>
      {/* 
      <nav className="HeaderNav">
        <a href="#">Home</a>
        <a href="#">Prices</a>
        <a href="#">Blog</a>
      </nav> */}

      <div className="HeaderAuth">
        <NavLink to={"/loginpage"}>Login</NavLink>
        <NavLink to={"/registerpage"}>Register</NavLink>
      </div>
    </header>
  );
}

export default Header;
