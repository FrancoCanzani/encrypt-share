'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface DecryptionEffectProps {
  text: string;
  duration?: number;
  characterSet?: string;
}

export default function DecryptionEffect({
  text,
  duration = 1000,
  characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
}: DecryptionEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const controls = useAnimationControls();

  const scrambleText = useCallback(
    (length: number) => {
      return Array(length)
        .fill(0)
        .map(
          () => characterSet[Math.floor(Math.random() * characterSet.length)]
        )
        .join('');
    },
    [characterSet]
  );

  useEffect(() => {
    const stepDuration = duration / (text.length * 2);

    const animateText = async () => {
      // Start with a random word of the same length as the target text
      const initialText = scrambleText(text.length);
      setDisplayText(initialText);

      await controls.start({ opacity: 1, transition: { duration: 0.2 } });

      for (let i = 0; i < text.length; i++) {
        setDisplayText(text.substring(0, i) + scrambleText(text.length - i));
        await new Promise((resolve) => setTimeout(resolve, stepDuration));
      }

      setDisplayText(text);
    };

    const timeoutId = setTimeout(animateText, 100);

    return () => clearTimeout(timeoutId);
  }, [text, duration, scrambleText, controls]);

  return (
    <motion.div
      className='min-h-[2em] flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {displayText}
    </motion.div>
  );
}
