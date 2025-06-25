import React, { useRef, useState, useEffect } from 'react';
import './Styles.css';

const songs = [
  {
    title: "Believer",
    src: "C:\Users\user\Downloads\Beliver (1).jpg",
    cover: `${process.env.PUBLIC_URL}/Beliver.jpg`
  },
  {
    title: "Halamathi Habibo",
    src: `${process.env.PUBLIC_URL}/halamathi_habibo.mp3`,
    cover: `${process.env.PUBLIC_URL}/hamathi.png`
  },
  {
    title: "Om Deva Deva",
    src: `${process.env.PUBLIC_URL}/Om_deva_deva.mp3`,
    cover: `${process.env.PUBLIC_URL}/deva.png`
  },
  {
    title: "Naatu Naatu",
    src: `${process.env.PUBLIC_URL}/naatu_naatu.mp3`,
    cover: `${process.env.PUBLIC_URL}/naatu.png`
  }
];

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    setProgress(progressPercent || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <div className="player-container">
      <img
        src={songs[currentSong].cover}
        className="cover"
        alt="cover"
        onError={(e) => { e.target.src = `${process.env.PUBLIC_URL}/fallback.png`; }}
      />

      <div className="scrolling-title">
        <span>{songs[currentSong].title}</span>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />

      <input
        type="range"
        className="seek-bar"
        value={progress}
        onChange={handleSeek}
        min="0"
        max="100"
      />

      <div className="time">
        {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(audioRef.current?.duration || 0)}
      </div>

      <div className="controls">
        <button onClick={prevSong}>⏮️</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={nextSong}>⏭️</button>
        <button onClick={() => (audioRef.current.currentTime = 0)}>🔁</button>
      </div>

      <div className="volume-control">
        <label htmlFor="volume">🔊</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={(e) => {
            audioRef.current.volume = e.target.value;
          }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
