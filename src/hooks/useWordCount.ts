import { useMemo } from 'react';

interface WordCountReturn {
  wordCount: number;
  characterCount: number;
  readingTime: number; // in minutes
}

const WORDS_PER_MINUTE = 200; // Average reading speed

export function useWordCount(text: string): WordCountReturn {
  return useMemo(() => {
    // Remove HTML tags for more accurate count
    const plainText = text.replace(/<[^>]*>/g, '');

    // Count words (split by whitespace and filter empty strings)
    const words = plainText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const wordCount = words.length;
    const characterCount = plainText.length;

    // Calculate reading time (round up to nearest minute)
    const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE) || 0;

    return {
      wordCount,
      characterCount,
      readingTime,
    };
  }, [text]);
}
