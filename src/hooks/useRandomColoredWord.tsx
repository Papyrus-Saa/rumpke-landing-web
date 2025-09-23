import { useState, useCallback } from 'react';

export function useRandomColoredWord(text: string, colors: string[]) {
  const [randomWordIndex, setRandomWordIndex] = useState(0);
  const [randomColor, setRandomColor] = useState(colors[0]);

  const pickRandom = useCallback(() => {
    const words = text.split(/(\s+)/);
    const wordIndices = words
      .map((w: string, i: number) => (/\w/.test(w) ? i : null))
      .filter((i: number | null) => i !== null) as number[];
    const idx = wordIndices[Math.floor(Math.random() * wordIndices.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    setRandomWordIndex(idx);
    setRandomColor(color);
  }, [text, colors]);

  const render = useCallback(() => {
    const words = text.split(/(\s+)/);
    return words.map((word: string, i: number) => {
      if (i === randomWordIndex && /\w/.test(word)) {
        return (
          <span
            key={i}
            style={{ color: randomColor, fontWeight: 'bold', display: 'inline-block' }}
            className="animate-colored-word"
          >
            {word}
          </span>
        );
      }
      return <span key={i} className="text-white dark:text-mint-200">{word}</span>;
    });
  }, [text, randomWordIndex, randomColor]);

  return { render, pickRandom };
}
