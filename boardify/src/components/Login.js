import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./NavBar.js";
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div>
      <Navbar/>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Password"  required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;