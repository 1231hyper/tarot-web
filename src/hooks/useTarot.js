import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { ALL_CARDS } from "../data/cards";

//  Fisher-Yates 洗牌
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 塔罗牌核心逻辑 Hook
 * @param {Object} options
 * @param {number} options.maxCards - 牌阵数量
 * @param {string[]} options.positions - 位置名称数组
 * @param {number} options.animationDelay - 翻牌动画锁时长 ms（默认 1500）
 * @param {number} options.displayLimit - 展示卡牌数（默认 21）
 * @param {number} options.spreadKey - 牌阵唯一标识，变化时自动重置
 */
export default function useTarot({
  maxCards = 3,
  positions = [],
  animationDelay = 1500,
  displayLimit = 21,
  spreadKey,
} = {}) {
  const [shuffledCards, setShuffledCards] = useState(() => shuffle(ALL_CARDS));
  const [selectedCards, setSelectedCards] = useState([]);
  const isProcessing = useRef(false);

  // 当 spreadKey 变化时，自动重置选牌状态并重新洗牌
  useEffect(() => {
    setSelectedCards([]);
    setShuffledCards(shuffle(ALL_CARDS));
    isProcessing.current = false;
  }, [spreadKey]);

  // 派生：仅展示前 displayLimit 张牌（洗牌后固定，不随抽牌移除）
  const displayCards = useMemo(() => {
    const pool = shuffledCards.length >= displayLimit
      ? shuffledCards
      : shuffledCards.concat(
          Array.from({ length: displayLimit - shuffledCards.length }, () => null)
        );
    return pool.slice(0, displayLimit);
  }, [shuffledCards, displayLimit]);

  // 派生：是否已完成
  const isComplete = selectedCards.length >= maxCards;

  const flipCard = useCallback(
    (card) => {
      if (isProcessing.current) return;

      // 通过 id 唯一校验（已翻出的牌不可再次点击）
      if (selectedCards.some((c) => c.card.id === card.id)) return;
      if (selectedCards.length >= maxCards) return;

      isProcessing.current = true;

      const isReversed = Math.random() < 0.5;
      const orientation = isReversed ? "逆位" : "正位";
      const position = positions[selectedCards.length] || `第${selectedCards.length + 1}张`;

      const entry = { card, position, orientation, isReversed };

      const newSelected = [...selectedCards, entry];
      setSelectedCards(newSelected);

      // 动画结束后解锁
      setTimeout(() => {
        isProcessing.current = false;
      }, animationDelay);
    },
    [selectedCards, maxCards, positions, animationDelay]
  );

  const restart = useCallback(() => {
    setShuffledCards(shuffle(ALL_CARDS));
    setSelectedCards([]);
    isProcessing.current = false;
  }, []);

  return {
    displayCards,
    selectedCards,
    isComplete,
    maxCards,
    flipCard,
    restart,
  };
}
