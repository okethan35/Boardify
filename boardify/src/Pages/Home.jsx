import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import Body from "../components/Body.jsx";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Navbar />
      <div className="home-container">
        {token ? (
          <Body />
        ) : (
          <div className = "login-container">
            <h1>Welcome to Boardify!</h1>
            <p>Join us today! Sign in or create an account to get started.</p>
            <Link to="/">
              <button className="login-button">
                Login
                </button>
            </Link>
            <br />
            <Link to="/signup">
              <button className="login-button">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

