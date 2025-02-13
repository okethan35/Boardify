import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="login-button">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
