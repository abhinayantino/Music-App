import React,{useState,useRef} from 'react';
//Adding Components
import "./styles/app.scss";
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from "./components/Library";
import Nav from "./components/Nav";
function App() {
  const audioRef = useRef(null);
  const [songs,setsongs]= useState(data());
  const [currentsong, setcurrentsong]= useState(songs[0]);
  const [isplaying,setisplaying]= useState(false);
  const [songinfo,setsonginfo] = useState({
        currenttime:0,
        duration: 0,
        animationpercentage: 0,
  });
  const [librarystatus,setlibrarystatus] = useState(false);
  const timeupdatehandler = (e) =>{
    const current=e.target.currentTime;
    const duration = e.target.duration;
    const roundedcurrent = Math.round(current);
    const roundedduration = Math.round(duration);
    const animation = Math.round((roundedcurrent / roundedduration)*100);
    
    console.log(e);
    setsonginfo({...songinfo,currenttime: current, duration,animationpercentage: animation});
  };
  const songendhandler =async() =>{
    let currentindex=songs.findIndex((song)=>song.id === currentsong.id);
    await setcurrentsong(songs[(currentindex+1)% songs.length]);
    if(isplaying) audioRef.current.play();
  }
  return (
    <div className={`App ${librarystatus ? "library-active" : ""}`}>
      <Nav librarystatus={librarystatus} setlibrarystatus={setlibrarystatus}/>
      <Song  currentsong={currentsong}/>
      <Player audioRef={audioRef} 
      isplaying={isplaying} 
      setisplaying={setisplaying} 
      currentsong={currentsong}
      setsonginfor={setsonginfo}
      songinfo={songinfo}
      songs={songs}
      setcurrentsong={setcurrentsong}
      setsongs={setsongs} />
      <Library audioRef={audioRef}
      songs={songs} 
      setcurrentsong={setcurrentsong}
      isplaying={isplaying}
      librarystatus={librarystatus}/>
      <audio onEnded={songendhandler}
      onTimeUpdate={timeupdatehandler} 
      onLoadedMetadata={timeupdatehandler} 
      ref={audioRef} 
      src={currentsong.audio}></audio>
    </div>
  );
}

export default App;
