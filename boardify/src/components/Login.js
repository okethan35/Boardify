import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;