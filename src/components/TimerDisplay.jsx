import React from 'react';

const TimerDisplay = ({ timeLeft, phase, current, numIntervals, isRunning }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center my-8">
      <div className={`text-8xl font-mono mb-2 transition-transform duration-500 ease-in-out ${phase === 'work' ? 'text-green-500' : 'text-blue-500'} ${isRunning ? 'scale-125' : 'scale-100'}`}>
        {formatTime(timeLeft)}
      </div>
      <div className="text-lg font-mono capitalize">
        {phase === 'work'
          ? `ROUND ${current}/${numIntervals}`
          : phase === 'break'
          ? `ROUND ${current}/${numIntervals} - BREAK TIME`
          : phase === 'done'
          ? 'Done!'
          : 'Press Start'}
      </div>
    </div>
  );
};

export default TimerDisplay;
