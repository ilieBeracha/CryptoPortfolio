import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <header className="Header">
      <div className="HeaderTitle">
        <h2>CryptoPortfolio</h2>
      </div>

      <nav className="HeaderNav">
        <a href="#">בית</a>
        <a href="#">מחירים</a>
        <a href="#">בלוג</a>
        <a href="#">אודותינו</a>
        {/* <a href="#">LOG IN</a> */}
        <NavLink to={'/loginpage'}>התחבר</NavLink>
      </nav>

      <div className="HeaderAuth">
        <NavLink to={'/registerpage'}>הרשם</NavLink>
      </div>
    </header>
  );
}

export default Header;
