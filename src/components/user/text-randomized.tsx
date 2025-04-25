import { useEffect, useState, useCallback, useRef } from 'react';

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,';

interface RandomizedTextEffectProps {
  text: string;
}

export function RandomizedTextEffect({ text }: RandomizedTextEffectProps) {
  const [animatedText, setAnimatedText] = useState('');
  const timerRef = useRef<number | null>(null);

  const getRandomChar = useCallback(
    () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    []
  );

  const animateText = useCallback(async () => {
    const duration = 50;
    const revealDuration = 80;
    const initialRandomDuration = 300;
    const repeatDelay = 2000;

    const generateRandomText = () =>
      text.split('').map(() => getRandomChar()).join('');

    setAnimatedText(generateRandomText());

    const endTime = Date.now() + initialRandomDuration;

    while (Date.now() < endTime) {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setAnimatedText(generateRandomText());
    }

    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, revealDuration));
      setAnimatedText(
        (prevText) =>
          text.slice(0, i + 1) +
          prevText.slice(i + 1).split('').map(() => getRandomChar()).join('')
      );
    }

    timerRef.current = window.setTimeout(animateText, repeatDelay);
  }, [text, getRandomChar]);

  useEffect(() => {
    animateText();
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, animateText]);

  return <span className="inline-block">{animatedText || text}</span>;
}