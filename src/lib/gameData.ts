export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

export interface GameMode {
  difficulty: Difficulty;
  label: string;
  memoryTime: number;
  typingTimePerQuestion: number;
  questionCount: number;
  description: string;
  multiplier: number;
}

export const GAME_MODES: Record<Difficulty, GameMode> = {
  easy: {
    difficulty: "easy",
    label: "Easy",
    memoryTime: 15,
    typingTimePerQuestion: 15,
    questionCount: 5,
    description: "Simple Words",
    multiplier: 1,
  },
  medium: {
    difficulty: "medium",
    label: "Medium",
    memoryTime: 10,
    typingTimePerQuestion: 10,
    questionCount: 5,
    description: "Tricky Phrases",
    multiplier: 1.5,
  },
  hard: {
    difficulty: "hard",
    label: "Hard",
    memoryTime: 10,
    typingTimePerQuestion: 10,
    questionCount: 5,
    description: "Tough Sentences",
    multiplier: 2,
  },
};

const EASY_QUESTIONS: Question[] = [
  { id: 1, question: "Color of the sky?", answer: "Blue", options: ["Blue", "Red", "Green"] },
  { id: 2, question: "Opposite of hot?", answer: "Cold", options: ["Warm", "Cold", "Cool"] },
  { id: 3, question: "Planet we live on?", answer: "Earth", options: ["Mars", "Earth", "Venus"] },
  { id: 4, question: "Frozen water?", answer: "Ice", options: ["Steam", "Ice", "Fog"] },
  { id: 5, question: "Baby cat?", answer: "Kitten", options: ["Puppy", "Kitten", "Cub"] },
  { id: 6, question: "Opposite of dark?", answer: "Light", options: ["Light", "Dim", "Shadow"] },
  { id: 7, question: "Number after nine?", answer: "Ten", options: ["Eight", "Ten", "Eleven"] },
  { id: 8, question: "Sun is a?", answer: "Star", options: ["Planet", "Star", "Moon"] },
  { id: 9, question: "Largest ocean?", answer: "Pacific", options: ["Atlantic", "Pacific", "Indian"] },
  { id: 10, question: "Honey maker?", answer: "Bee", options: ["Ant", "Bee", "Wasp"] },
];

const MEDIUM_QUESTIONS: Question[] = [
  { id: 1, question: "Capital of Japan?", answer: "Tokyo", options: ["Osaka", "Tokyo", "Kyoto"] },
  { id: 2, question: "H2O is?", answer: "Water", options: ["Water", "Oxygen", "Hydrogen"] },
  { id: 3, question: "Fastest land animal?", answer: "Cheetah", options: ["Lion", "Cheetah", "Leopard"] },
  { id: 4, question: "Smallest prime?", answer: "Two", options: ["One", "Two", "Three"] },
  { id: 5, question: "Author of Hamlet?", answer: "Shakespeare", options: ["Dickens", "Shakespeare", "Austen"] },
  { id: 6, question: "Currency of UK?", answer: "Pound", options: ["Euro", "Pound", "Dollar"] },
  { id: 7, question: "Largest planet?", answer: "Jupiter", options: ["Saturn", "Jupiter", "Neptune"] },
  { id: 8, question: "Speed of light unit?", answer: "Meters per second", options: ["Meters per second", "Miles per hour", "Kilometers"] },
  { id: 9, question: "DNA stands for?", answer: "Deoxyribonucleic acid", options: ["Deoxyribonucleic acid", "Dynamic nuclear acid", "Digital network array"] },
  { id: 10, question: "Boiling point of water?", answer: "100 degrees", options: ["90 degrees", "100 degrees", "110 degrees"] },
];

const HARD_QUESTIONS: Question[] = [
  { id: 1, question: "Schrödinger's thought experiment animal?", answer: "Cat", options: ["Cat", "Dog", "Rat", "Bird", "Fish", "Mouse", "Rabbit", "Snake", "Frog", "Hamster"] },
  { id: 2, question: "Planck's constant symbol?", answer: "h", options: ["h", "p", "k", "c", "G", "e", "m", "n", "R", "T"] },
  { id: 3, question: "Year the Berlin Wall fell?", answer: "1989", options: ["1987", "1988", "1989", "1990", "1991", "1985", "1986", "1992", "1984", "1993"] },
  { id: 4, question: "Chemical symbol for Gold?", answer: "Au", options: ["Au", "Ag", "Fe", "Cu", "Pb", "Sn", "Zn", "Ni", "Pt", "Hg"] },
  { id: 5, question: "Deepest ocean trench?", answer: "Mariana", options: ["Mariana", "Tonga", "Java", "Puerto Rico", "Kuril", "Philippine", "Kermadec", "Izu", "Japan", "Peru"] },
  { id: 6, question: "First element on periodic table?", answer: "Hydrogen", options: ["Helium", "Hydrogen", "Lithium", "Carbon", "Oxygen", "Nitrogen", "Boron", "Neon", "Fluorine", "Sodium"] },
  { id: 7, question: "Speed of sound in m/s (approx)?", answer: "343", options: ["299", "343", "400", "250", "186", "500", "275", "320", "360", "410"] },
  { id: 8, question: "Inventor of telephone?", answer: "Bell", options: ["Bell", "Edison", "Tesla", "Morse", "Marconi", "Watt", "Newton", "Faraday", "Volta", "Hertz"] },
  { id: 9, question: "Largest bone in human body?", answer: "Femur", options: ["Femur", "Tibia", "Humerus", "Spine", "Pelvis", "Skull", "Scapula", "Radius", "Ulna", "Fibula"] },
  { id: 10, question: "Pi to 2 decimals?", answer: "3.14", options: ["3.14", "3.15", "3.12", "3.16", "3.13", "3.17", "3.11", "3.18", "3.10", "3.19"] },
];

const QUESTION_BANKS: Record<Difficulty, Question[]> = {
  easy: EASY_QUESTIONS,
  medium: MEDIUM_QUESTIONS,
  hard: HARD_QUESTIONS,
};

export function getRandomQuestions(difficulty: Difficulty, count: number): Question[] {
  const bank = [...QUESTION_BANKS[difficulty]];
  const shuffled = bank.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, i) => ({
    ...q,
    options: [...q.options].sort(() => Math.random() - 0.5),
    id: i,
  }));
}

export interface GameResult {
  correct: number;
  wrong: number;
  totalQuestions: number;
  accuracy: number;
  wpm: number;
  mistakes: number;
  score: number;
  difficulty: Difficulty;
  answers: { question: string; correctAnswer: string; userAnswer: string; isCorrect: boolean }[];
}

export function calculateScore(
  correct: number,
  totalQuestions: number,
  totalTypingTime: number,
  totalCharsTyped: number,
  difficulty: Difficulty
): GameResult["score"] {
  const accuracy = correct / totalQuestions;
  const wpm = totalTypingTime > 0 ? (totalCharsTyped / 5) / (totalTypingTime / 60) : 0;
  const baseScore = correct * 100;
  const speedBonus = Math.floor(wpm * 2);
  const accuracyBonus = Math.floor(accuracy * 200);
  const multiplier = GAME_MODES[difficulty].multiplier;
  return Math.floor((baseScore + speedBonus + accuracyBonus) * multiplier);
}
