import { useState, useCallback, useRef } from "react";
import { ALL_CARDS, POSITIONS } from "../data/cards";

//  Fisher-Yates 洗牌
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function useTarot() {
  const [shuffledCards, setShuffledCards] = useState(() => shuffle(ALL_CARDS));
  const [flippedCards, setFlippedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const isProcessing = useRef(false);

  const flipCard = useCallback(
    (card) => {
      if (isProcessing.current) return;
      if (selectedCards.some((c) => c.name === card.name)) return;
      if (selectedCards.length >= 3) return;

      isProcessing.current = true;

      const isReversed = Math.random() < 0.5;
      const orientation = isReversed ? "逆位" : "正位";
      const posIdx = selectedCards.length;

      const entry = {
        card,
        position: POSITIONS[posIdx],
        orientation,
        isReversed,
      };

      const newSelected = [...selectedCards, entry];
      setSelectedCards(newSelected);

      if (newSelected.length === 3) {
        setFlippedCards(newSelected);
      }

      setTimeout(() => {
        isProcessing.current = false;
      }, 100);
    },
    [selectedCards]
  );

  const restart = useCallback(() => {
    setShuffledCards(shuffle(ALL_CARDS));
    setSelectedCards([]);
    setFlippedCards([]);
    isProcessing.current = false;
  }, []);

  return {
    shuffledCards,
    flippedCards,
    selectedCards,
    isComplete: selectedCards.length >= 3,
    flipCard,
    restart,
  };
}
