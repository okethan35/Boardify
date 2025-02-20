import logo from '../assets/logo.png';
import '../styles/NavBar.css';

export default function NavBar(){
    return (
        <div className="nav-bar">
            <div className='logo-box'>
                <a className='logo' href="/">
                    <img src={logo}></img>
                </a>
            </div>
            <ul className='nav-list'>
                <li className='nav-items'><a href='/'>HOME</a></li>
                <li className='nav-items'><a href=''>PROFILE</a></li>
            </ul>
        </div>
    )
}