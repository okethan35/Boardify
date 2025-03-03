import './App.css';
import NavBar from './components/NavBar';
import Body from './components/Body';
import BoardingPass from './components/BoardingPass';

function App() {
  const user = {
    tracks: [["Take A Bite", "beabadoobee"],
      ["Wake Me Up (feat. Justice)", "The Weeknd"],
      ["Open Hearts", "The Weeknd"],
      ["No Surprises", "Radiohead"],
      ["Cigarette Butt", "BUBBLE TEA AND CIGARETTES"]
      ],
    artists: ["The Weeknd",
      "beabadoobee",
      "Twenty One Pilots",
      "Daniel Caesar",
      "Brent Faiyaz"],
    genres: [
      "Pop",
      "Indie Rock",
      "Rap",
      "R&B",
      "Alternative"
    ]
  }

  return (
    <div className="App">
     {/* <NavBar />
     <Body />*/}
    <BoardingPass user={user}/>
    </div>

  );
}

export default App;
