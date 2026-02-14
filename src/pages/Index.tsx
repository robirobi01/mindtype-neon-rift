import { AnimatePresence } from "framer-motion";
import { GameProvider, useGame } from "@/context/GameContext";
import HeroScreen from "@/components/game/HeroScreen";
import ModeSelect from "@/components/game/ModeSelect";
import MemoryPhase from "@/components/game/MemoryPhase";
import TypingPhase from "@/components/game/TypingPhase";
import ResultScreen from "@/components/game/ResultScreen";
import StarField from "@/components/game/StarField";

function GameRouter() {
  const { phase } = useGame();

  return (
    <div className="relative min-h-screen bg-space scanline">
      <StarField />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "hero" && <HeroScreen key="hero" />}
          {phase === "mode-select" && <ModeSelect key="mode" />}
          {phase === "memory" && <MemoryPhase key="memory" />}
          {phase === "typing" && <TypingPhase key="typing" />}
          {phase === "result" && <ResultScreen key="result" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
