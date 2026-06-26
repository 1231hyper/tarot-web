import { useState, useEffect } from "react";
import useTarot from "./hooks/useTarot";
import CardGrid from "./components/CardGrid";
import PositionPanel from "./components/PositionPanel";
import ReadingModal from "./components/ReadingModal";
import "./App.css";

export default function App() {
  const { shuffledCards, flippedCards, selectedCards, isComplete, flipCard, restart } = useTarot();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setShowModal(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">塔罗牌三张牌牌阵</h1>
        <p className="app-subtitle">点击翻开牌面，依次选择3张牌（过去、现在、未来）</p>
      </header>

      <div className="app-body">
        <PositionPanel selectedCards={selectedCards} onRestart={restart} />

        <main className="card-area">
          <CardGrid
            cards={shuffledCards}
            selectedCards={selectedCards}
            onFlip={flipCard}
            isComplete={isComplete}
          />
          <p className="card-hint">
            {isComplete
              ? "已选完3张牌，查看解读结果"
              : `点击卡牌翻开，共需选择3牌（已选 ${selectedCards.length}/3）`}
          </p>
        </main>
      </div>

      {showModal && (
        <ReadingModal flippedCards={flippedCards} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
