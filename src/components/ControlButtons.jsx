import React from 'react';

const ControlButtons = ({ isRunning, start, pause, reset }) => {
  return (
    <div className="flex justify-center gap-4">
      {!isRunning ? (
        <button
          onClick={start}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-32"
        >
          Start
        </button>
      ) : (
        <button
          onClick={pause}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-32"
        >
          Pause
        </button>
      )}
      <button
        onClick={reset}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-32"
      >
        Reset
      </button>
    </div>
  );
};

export default ControlButtons;
