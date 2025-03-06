// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import Profile from "./components/Profile/Profile";
import "react-image-crop/dist/ReactCrop.css";

function App() {
  return (
    <div className="bg-gray-900 text-gray-400 min-h-screen p-4">
      <Profile />
    </div>
  );
}

export default App;