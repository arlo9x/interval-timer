import React from 'react';

const SettingsForm = ({ intervalTime, setIntervalTime, breakTime, setBreakTime, numIntervals, setNumIntervals, isRunning }) => {

  const createChangeHandler = (setter) => (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
        setter(value);
    }
  };

  const createBlurHandler = (value, setter) => () => {
    if (value === "" || Number(value) < 1) {
      setter(1);
    }
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interval time (s):</label>
          <input
            type="number"
            min="1"
            value={intervalTime}
            onChange={createChangeHandler(setIntervalTime)}
            onBlur={createBlurHandler(intervalTime, setIntervalTime)}
            className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Break time (s):</label>
          <input
            type="number"
            min="1"
            value={breakTime}
            onChange={createChangeHandler(setBreakTime)}
            onBlur={createBlurHandler(breakTime, setBreakTime)}
            className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rounds (number):</label>
          <input
            type="number"
            min="1"
            value={numIntervals}
            onChange={createChangeHandler(setNumIntervals)}
            onBlur={createBlurHandler(numIntervals, setNumIntervals)}
            className="w-full p-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
