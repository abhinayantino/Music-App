import React,{useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, 
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({setsongs,audioRef,
    currentsong,setcurrentsong,isplaying,
    setisplaying,setsonginfo,songinfo,songs}) =>{
    useEffect(() => {
        const newsongs = songs.map((song) => {
            if(song.id===currentsong.id){
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
    
    },[currentsong]);
    const playsonghandler=()=>{
        if(isplaying){
            audioRef.current.pause();
            setisplaying(!isplaying);
        }else{
            audioRef.current.play();
            setisplaying(!isplaying);
        }
    };

    const gettime = (time) => {
        console.log(songinfo);
        return(
            Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
        );
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setsonginfo({...songinfo,currenttime: e.target.value});
    }
    const skiptrackhandler = async(direction)=>{
        let currentindex=songs.findIndex((song)=>song.id === currentsong.id);
        if (direction === 'skip-forward'){
        await setcurrentsong(songs[(currentindex+1)% songs.length]);

        }
        if (direction === 'skip-back'){
            if((currentindex - 1) % songs.length === -1){
                await setcurrentsong(songs[songs.length -1]);
                if(isplaying) audioRef.current.play();
                return;
            }
            await setcurrentsong(songs[(currentindex-1)% songs.length]);

        }
        if(isplaying) audioRef.current.play();
    }
    const trackAnim={
        transform: `translateX(${songinfo.animationpercentage}%)`
    };
    return (
        <div className="player">
            <div className="time-container">
               <p>{gettime(songinfo.currenttime)}</p> 
               <div style={{background: `linear-gradient(to right,${currentsong.color[0]},${currentsong.color[1]})`}}className="track">
                    <input min={0} 
                        max={songinfo.duration || 0} 
                        value={songinfo.currenttime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim}className="animate-track"></div>
                </div>
            
               <p>{gettime(songinfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                onClick= {()=>skiptrackhandler('skip-back')}
                className="skip-back" 
                size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playsonghandler} className="play" size="2x" icon={isplaying ? faPause:faPlay}/>
                <FontAwesomeIcon 
                onClick= {()=>skiptrackhandler('skip-forward')}
                className="skip-forward" 
                size="2x" icon={faAngleRight}/>
            </div>
        </div>
    );
    
};
export default Player;