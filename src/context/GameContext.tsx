import React, { createContext, useContext, useState, useCallback } from "react";
import { Difficulty, Question, GameResult, getRandomQuestions, GAME_MODES, calculateScore } from "@/lib/gameData";

type GamePhase = "hero" | "mode-select" | "memory" | "typing" | "result";

interface GameState {
  phase: GamePhase;
  difficulty: Difficulty | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[];
  startTime: number;
  totalCharsTyped: number;
  result: GameResult | null;
}

interface GameContextType extends GameState {
  setPhase: (phase: GamePhase) => void;
  selectMode: (difficulty: Difficulty) => void;
  startTyping: () => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  finishGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be within GameProvider");
  return ctx;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>({
    phase: "hero",
    difficulty: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: 0,
    totalCharsTyped: 0,
    result: null,
  });

  const setPhase = useCallback((phase: GamePhase) => {
    setState((s) => ({ ...s, phase }));
  }, []);

  const selectMode = useCallback((difficulty: Difficulty) => {
    const mode = GAME_MODES[difficulty];
    const questions = getRandomQuestions(difficulty, mode.questionCount);
    setState((s) => ({
      ...s,
      difficulty,
      questions,
      currentQuestionIndex: 0,
      userAnswers: [],
      totalCharsTyped: 0,
      result: null,
      phase: "memory",
    }));
  }, []);

  const startTyping = useCallback(() => {
    setState((s) => ({ ...s, phase: "typing", startTime: Date.now(), currentQuestionIndex: 0 }));
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    setState((s) => ({
      ...s,
      userAnswers: [...s.userAnswers, answer],
      totalCharsTyped: s.totalCharsTyped + answer.length,
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState((s) => ({ ...s, currentQuestionIndex: s.currentQuestionIndex + 1 }));
  }, []);

  const finishGame = useCallback(() => {
    setState((s) => {
      const totalTime = (Date.now() - s.startTime) / 1000;
      const answers = s.questions.map((q, i) => ({
        question: q.question,
        correctAnswer: q.answer,
        userAnswer: s.userAnswers[i] || "",
        isCorrect: (s.userAnswers[i] || "").toLowerCase().trim() === q.answer.toLowerCase().trim(),
      }));
      const correct = answers.filter((a) => a.isCorrect).length;
      const wrong = answers.length - correct;
      const accuracy = Math.round((correct / answers.length) * 100);
      const wpm = totalTime > 0 ? Math.round((s.totalCharsTyped / 5) / (totalTime / 60)) : 0;
      const score = calculateScore(correct, answers.length, totalTime, s.totalCharsTyped, s.difficulty!);

      return {
        ...s,
        phase: "result",
        result: { correct, wrong, totalQuestions: answers.length, accuracy, wpm, mistakes: wrong, score, difficulty: s.difficulty!, answers },
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState({
      phase: "hero",
      difficulty: null,
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      startTime: 0,
      totalCharsTyped: 0,
      result: null,
    });
  }, []);

  return (
    <GameContext.Provider value={{ ...state, setPhase, selectMode, startTyping, submitAnswer, nextQuestion, finishGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}
