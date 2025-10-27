import { useState } from 'react';
import useSimpleTimer from './hooks/useSimpleTimer';
import TimerDisplay from './components/TimerDisplay';
import ControlButtons from './components/ControlButtons';
import SettingsForm from './components/SettingsForm';

export default function App() {
  const [intervalTime, setIntervalTime] = useState(30);
  const [breakTime, setBreakTime] = useState(10);
  const [numIntervals, setNumIntervals] = useState(5);

  const {
    timeLeft,
    phase,
    current,
    isRunning,
    start,
    pause,
    reset,
    backgroundColor
  } = useSimpleTimer(intervalTime, breakTime, numIntervals);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-gray-100 p-4"
      style={{ backgroundColor, transition: 'background-color 1s ease' }}
    >
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <h1 className="text-2xl font-bold text-center mb-6">Simple Interval Timer</h1>
            <SettingsForm
              intervalTime={intervalTime}
              setIntervalTime={setIntervalTime}
              breakTime={breakTime}
              setBreakTime={setBreakTime}
              numIntervals={numIntervals}
              setNumIntervals={setNumIntervals}
              isRunning={isRunning}
            />
            <TimerDisplay timeLeft={timeLeft} phase={phase} current={current} numIntervals={numIntervals} isRunning={isRunning} />
            <ControlButtons isRunning={isRunning} start={start} pause={pause} reset={reset} />
          </div>
        </div>
      </div>
    </div>
  );
}