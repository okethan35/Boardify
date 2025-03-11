import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import Body from "../components/Body.jsx";
import QRCode from "../components/QRCode.jsx"; // Import QRCode component

const Home = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // Assuming username is stored here

  return (
    <div>
      <Navbar />
      <div className="home-container">
      {username && <QRCode username={username} />}
        {token ? (
          <Body />
        ) : (
          <div className="login-container">
            <h1>Welcome to Boardify!</h1>
            <p>Join us today! Sign in or create an account to get started.</p>
            <br />
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <br />
            <Link to="/signup">
              <button className="login-button">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
