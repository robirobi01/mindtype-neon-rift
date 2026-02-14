import { motion } from "framer-motion";
import { Brain, Keyboard } from "lucide-react";
import { useGame } from "@/context/GameContext";

export default function HeroScreen() {
  const { setPhase } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen gap-8 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Brain className="w-20 h-20 text-primary" />
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
      </motion.div>

      <div className="text-center space-y-3">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-5xl md:text-7xl font-display font-black tracking-wider text-glow-cyan text-primary"
        >
          MIND<span className="text-neon-orange">TYPE</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl font-display tracking-[0.3em] text-muted-foreground uppercase"
        >
          Memory & Typing Challenge
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-6 text-muted-foreground text-sm font-body"
      >
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-neon-green" />
          <span>Memorize</span>
        </div>
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-neon-orange" />
          <span>Type</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setPhase("mode-select")}
        className="mt-4 px-10 py-4 font-display font-bold text-lg tracking-wider uppercase
          bg-primary/10 text-primary neon-border-cyan rounded-lg
          hover:bg-primary/20 transition-colors duration-300"
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}
