import React from 'react';
import LibrarySong from "./LibrarySong";
const Library = ({songs,setcurrentsong,audioRef,isplaying,librarystatus})=>{
    return(
        <div className={`library ${librarystatus ? 'active-library': ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong 
                    songs={songs} 
                    setcurrentsong={setcurrentsong} 
                    song={song}
                    id={song.id}
                    key={song.id}
                    audioRef={audioRef}
                    isplaying={isplaying}/>
                ))}
            </div>
        </div>
    )
}
export default Library;