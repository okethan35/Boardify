import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import BoardingPass from "./Pages/BoardingPass";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/boarding-pass" element={<BoardingPass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
