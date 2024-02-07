// src/App.js
import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import Alarm from './components/Alarm';
import './App.css';

const App = () => {
  const [currentTab, setCurrentTab] = useState('timer');

  useEffect(() => {
    document.title = `Clock App - ${currentTab}`;
  }, [currentTab]);

  return (
    <div className="app">
      <h1>Clock App</h1>
      <div className="tabs">
        <button onClick={() => setCurrentTab('timer')}>Timer</button>
        <button onClick={() => setCurrentTab('stopwatch')}>Stopwatch</button>
        <button onClick={() => setCurrentTab('alarm')}>Alarm</button>
      </div>
      {currentTab === 'timer' && <Timer />}
      {currentTab === 'stopwatch' && <Stopwatch />}
      {currentTab === 'alarm' && <Alarm />}
    </div>
  );
};

export default App;
