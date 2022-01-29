import React from 'react';

const LibrarySong = ({setsongs,currentsong,song,songs,setcurrentsong,id,audioRef,isplaying}) =>{
    const songSelectHandler= async ()=>{
        const selectedsong=songs.filter((state)=> state.id===id);
        await setcurrentsong(selectedsong[0]);
        const newsongs = songs.map((song) => {
            if(song.id===id){
                return{
                    ...song,active:true,
                };
            }else{
                return{
                    ...song,
                    active:false,
                };
            }
        });
        setsongs(newsongs);
        if(isplaying) audioRef.current.play();
    };
    return (
        <div onClick={songSelectHandler} className="library-Song">
            <img src={song.cover} alt="romantic"></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
    
};
export default LibrarySong;