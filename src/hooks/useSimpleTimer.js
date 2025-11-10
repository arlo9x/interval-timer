import { useState, useEffect, useRef } from 'react';

export default function useSimpleTimer(intervalTime, breakTime, numIntervals) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'work' | 'break' | 'done'
  const [current, setCurrent] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const isTransitioning = useRef(false);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  // Function to initialize the AudioContext
  const initAudio = () => {
    if (!audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        audioContextRef.current = context;
        gainNodeRef.current = context.createGain();
        gainNodeRef.current.connect(context.destination);
      } catch (e) {
        console.error("Could not create AudioContext", e);
      }
    }
  };
  
  useEffect(() => {
    // Cleanup audio context on unmount
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);


  const playSound = (freq, gain, duration) => {
    if (!audioContextRef.current) return;
    
    // Resume context if it's suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const audioContext = audioContextRef.current;
    const gainNode = gainNodeRef.current;
    const oscillator = audioContext.createOscillator();
    oscillator.connect(gainNode);

     oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    const now = audioContext.currentTime;
    const fadeTime = 0.00;
    const sustainTime = duration - fadeTime * 2 > 0 ? duration - fadeTime * 2 : 0;

    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);

    gainNode.gain.linearRampToValueAtTime(gain, now + fadeTime);

    gainNode.gain.setValueAtTime(gain, now + fadeTime + sustainTime);

    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  };

  const playStartEndSound = () => playSound(1600, 0.2, 0.1);
  const playCountdownSound = () => playSound(1000, 0.15, 0.05);

  const workColors = ['#9FE2C9FF', '#dcedc1', '#F5C3A1FF', '#ffaaa5', '#FFDA8BFF'];
  const breakColor = '#2CA4DBFF';

  useEffect(() => {
    isTransitioning.current = false;
  }, [phase]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playStartEndSound();
            handlePhaseEnd();
            return 0;
          }
          if (prev > 1 && prev <= 4) { // Countdown at 3, 2, 1
            playCountdownSound();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, phase]);

  const handlePhaseEnd = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    clearInterval(timerRef.current);
    if (phase === 'work') {
      if (current < numIntervals) {
        setPhase('break');
        setTimeLeft(breakTime);
        setBackgroundColor(breakColor);
      } else {
        setPhase('done');
        setIsRunning(false);
        setBackgroundColor('');
      }
    } else if (phase === 'break') {
      if (current >= numIntervals) {
        setPhase('done');
        setIsRunning(false);
        setBackgroundColor('');
        return;
      }
      setCurrent(prev => prev + 1);
      setPhase('work');
      setTimeLeft(intervalTime);
      setBackgroundColor(workColors[Math.floor(Math.random() * workColors.length)]);
    }
  };

  const start = () => {
    // Initialize audio on the first start click
    initAudio();
      
    if (phase === 'idle' || phase === 'done') {
      setPhase('work');
      setCurrent(1);
      setTimeLeft(intervalTime);
      setBackgroundColor(workColors[Math.floor(Math.random() * workColors.length)]);
    }
    setIsRunning(true);
    playStartEndSound();
  };

  const pause = () => setIsRunning(false);
  const reset = () => {
    clearInterval(timerRef.current);
    setPhase('idle');
    setCurrent(1);
    setTimeLeft(0);
    setIsRunning(false);
    setBackgroundColor('');
  };

  return { timeLeft, phase, current, isRunning, start, pause, reset, backgroundColor };
}