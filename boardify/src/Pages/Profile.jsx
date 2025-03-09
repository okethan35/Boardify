import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import "../styles/Profile.css";

const Profile = () => {
  return(
    <div>
        <Navbar/>
        <div className='body'>
            <h1>Profile </h1>
            <h2>Name </h2>
            <h2>Top Tracks </h2>
            <h2>Top Artists </h2>
        </div>
    </div>
  );
}

export default Profile;
