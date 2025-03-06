import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import "../styles/NavBar.css";

const users = [
  { _id: "1", username: "john_doe", profilePic: "/images/john.jpg" },
  { _id: "2", username: "jane_smith", profilePic: "/images/jane.jpg" },
  { _id: "3", username: "mike_williams", profilePic: "/images/mike.jpg" },
];

export default function NavBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filteredResults = users.filter(user =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setResults(filteredResults);

  };
  return (
    <div className="nav-bar">
      <div className="logo-box">
        <Link className="logo" to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
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
            <Link to={`/profile/${user.username}`}>
              <img src={user.profilePic} alt={user.username} className="search-img" />
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
      <ul className="nav-list">
        <li className="nav-items"><Link to="/">HOME</Link></li>
        <li className="nav-items"><Link to="/profile">PROFILE</Link></li>
        <li className="nav-items"><Link to="/login">LOG IN</Link></li>
      </ul>
    </div>
  );
}