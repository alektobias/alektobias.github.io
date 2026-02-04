import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const FlipWords = ({
  words,
  duration = 2500,
  className,
  cursorClassName = "bg-purple-500", // Default cursor color to purple to match theme
}: {
  words: string[];
  duration?: number;
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    // Typing speeds
    const typeSpeed = 60; // Slightly faster typing
    const deleteSpeed = 50;
    const pauseBeforeDelete = duration; // wait time after finishing word
    const pauseBeforeType = 40; // minimal wait time after deleting word before typing next

    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === word) {
      // Finished typing, wait then delete
      timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
    } else if (isDeleting && currentText === "") {
      // Finished deleting, wait then next word
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, pauseBeforeType);
    } else {
      // Typing or Deleting
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? word.substring(0, currentText.length - 1)
          : word.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, duration]);

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span>{currentText}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn("inline-block w-[3px] h-[1em] ml-1 align-bottom", cursorClassName)}
      />
    </div>
  );
};
