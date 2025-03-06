import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo-box">
        <Link className="logo" to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-list">
        <li className="nav-items"><Link to="/">HOME</Link></li>
        <li className="nav-items"><Link to="/profile">PROFILE</Link></li>
        <li className="nav-items"><Link to="/login">LOG IN</Link></li>
      </ul>
    </div>
  );
}