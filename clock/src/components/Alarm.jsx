// src/Alarm.js
import React, { useState } from 'react';

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  const handleSetAlarm = () => {
    if (!alarmTime) {
      alert('Please set a valid alarm time.');
      return;
    }

    // Convert alarmTime to milliseconds since midnight
    const [hours, minutes] = alarmTime.split(':');
    const alarmMilliseconds = new Date().setHours(hours, minutes, 0, 0);

    // Set up a timeout for the alarm
    const currentMilliseconds = new Date().getTime();
    const timeoutDuration = alarmMilliseconds - currentMilliseconds;

    if (timeoutDuration <= 0) {
      alert('Invalid alarm time. Please set a future time.');
      return;
    }

    setIsAlarmActive(true);

    setTimeout(() => {
      alert('Alarm! Time to wake up!');
      setIsAlarmActive(false);
    }, timeoutDuration);
  };

  const handleCancelAlarm = () => {
    setIsAlarmActive(false);
  };

  return (
    <div className="alarm-container">
      <h2>Alarm</h2>
      <div className="alarm-input">
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
      </div>
      <div className="alarm-buttons">
        <button onClick={handleSetAlarm}>Set Alarm</button>
        <button onClick={handleCancelAlarm}>Cancel Alarm</button>
      </div>
      {isAlarmActive && <p>Alarm is active!</p>}
    </div>
  );
};

export default Alarm;
