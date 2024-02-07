// src/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState('');

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      alert('Timer complete!');
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(initialTime);
    setInputTime('');
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const handleSetTime = () => {
    const parsedTime = parseInt(inputTime, 10);

    if (isNaN(parsedTime) || parsedTime <= 0) {
      alert('Please enter a valid positive number for the timer.');
      return;
    }

    setInitialTime(parsedTime);
    setTime(parsedTime);
  };

  return (
    <div className="timer-container">
      <h2>Timer</h2>
      <div>
        <label htmlFor="timerInput">Set Timer (seconds):</label>
        <input
          type="number"
          id="timerInput"
          value={inputTime}
          onChange={handleInputChange}
        />
        <button onClick={handleSetTime}>Set Time</button>
      </div>
      <div className="timer-display">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </div>
      <div className="timer-buttons">
        <button onClick={handleStartStop}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
