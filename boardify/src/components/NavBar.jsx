import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import "../styles/NavBar.css";

const API_URL = process.env.REACT_APP_API_URL; 


export default function NavBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileLink = `/profile/${localStorage.getItem("username")}`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    try {
      console.log("VALUE:", value);
      const response = await fetch(`${API_URL}/query/search?query=${value}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handleProfileClick = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="nav-bar">
      <div className="logo-box">
        <Link className="logo" to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
            {isLoggedIn && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search profiles..."
            value={query}
            onChange={handleSearch}
            className="search-input"
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map(user => (
                <li key={user._id} className="search-item">
                  <Link 
                    to={`/profile/${user.username}`}
                    onClick={handleProfileClick}
                  >
                    {user.username}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <ul className="nav-list">
        <li className="nav-items"><Link to="/home">HOME</Link></li>
        <li className="nav-items"><Link to={ profileLink }>PROFILE</Link></li>
        {localStorage.getItem("token") ? (
          <li className="nav-items">
            <Link 
              to="/home" 
              onClick={() => { 
                localStorage.removeItem("token"); 
                localStorage.removeItem("username"); 
              }} 
              className="nav-link"
            >
              LOG OUT
            </Link>
          </li>
        ) : (
          <li className="nav-items"><Link to="/login">LOG IN</Link></li>
  )}

      </ul>
    </div>
  );
}