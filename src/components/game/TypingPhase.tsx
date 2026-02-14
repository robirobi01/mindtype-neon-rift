import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { GAME_MODES } from "@/lib/gameData";

export default function TypingPhase() {
  const { difficulty, questions, currentQuestionIndex, submitAnswer, nextQuestion, finishGame } = useGame();
  const mode = GAME_MODES[difficulty!];
  const [timeLeft, setTimeLeft] = useState(mode.typingTimePerQuestion);
  const [input, setInput] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLastQuestion = currentQuestionIndex >= questions.length;

  // Show question for 5 seconds then hide
  useEffect(() => {
    setShowQuestion(true);
    setInput("");
    const hideTimer = setTimeout(() => setShowQuestion(false), 5000);
    return () => clearTimeout(hideTimer);
  }, [currentQuestionIndex]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestionIndex, showQuestion]);

  // Timer per question
  useEffect(() => {
    setTimeLeft(mode.typingTimePerQuestion);
  }, [currentQuestionIndex, mode.typingTimePerQuestion]);

  useEffect(() => {
    if (isLastQuestion) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isLastQuestion]);

  function handleSubmit() {
    submitAnswer(input);
    if (currentQuestionIndex >= questions.length - 1) {
      // Small delay so state updates
      setTimeout(() => finishGame(), 100);
    } else {
      nextQuestion();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  if (isLastQuestion) return null;

  const question = questions[currentQuestionIndex];
  const progress = timeLeft / mode.typingTimePerQuestion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen gap-8 px-4"
    >
      {/* Progress */}
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-8 h-1.5 rounded-full transition-colors ${
              i < currentQuestionIndex ? "bg-neon-green" : i === currentQuestionIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="text-sm font-body text-muted-foreground">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {showQuestion ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-6 rounded-lg bg-card/60 backdrop-blur-sm border border-border max-w-md w-full"
          >
            <p className="text-xl font-display font-bold text-foreground">{question.question}</p>
            <p className="text-xs text-muted-foreground mt-2 font-body">Disappears in a few seconds...</p>
          </motion.div>
        ) : (
          <motion.div
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6 rounded-lg bg-card/30 border border-border/50 max-w-md w-full"
          >
            <p className="text-lg font-display text-muted-foreground">Type your answer from memory!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="w-full max-w-md">
        <motion.div
          className="relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            className="w-full px-5 py-4 bg-card/60 border border-primary/40 rounded-lg
              font-body text-lg text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
              backdrop-blur-sm transition-all"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md
              bg-primary/20 text-primary font-display text-sm font-bold
              hover:bg-primary/30 transition-colors"
          >
            Enter
          </button>
        </motion.div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              background: `linear-gradient(90deg, hsl(var(--neon-cyan)), ${timeLeft <= 3 ? "hsl(var(--neon-red))" : "hsl(var(--neon-green))"})`,
              width: `${progress * 100}%`,
            }}
          />
        </div>
        <span className={`text-2xl font-display font-black ${timeLeft <= 3 ? "text-neon-red text-glow-red" : "text-primary text-glow-cyan"}`}>
          {timeLeft}s
        </span>
      </div>
    </motion.div>
  );
}
