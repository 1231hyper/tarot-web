import { useMemo } from "react";
import CardBack from "./CardBack";

// 判断牌的花色和索引
function getSuitInfo(card) {
  const id = card.id;
  if (id < 22) return { suit: "Major", majorIndex: id, minorIndex: 0 };
  if (id < 36) return { suit: "Wands", majorIndex: -1, minorIndex: id - 22 };
  if (id < 50) return { suit: "Cups", majorIndex: -1, minorIndex: id - 36 };
  if (id < 64) return { suit: "Swords", majorIndex: -1, minorIndex: id - 50 };
  return { suit: "Pentacles", majorIndex: -1, minorIndex: id - 64 };
}

export default function CardGrid({ cards, selectedCards, onFlip, isComplete }) {
  const selectedIds = useMemo(
    () => new Set(selectedCards.map((c) => c.card.id)),
    [selectedCards]
  );

  return (
    <div className="card-grid">
      {cards.map((card) => {
        const isFlipped = selectedIds.has(card.id);
        return (
          <CardBack
            key={card.id}
            card={card}
            onClick={() => onFlip(card)}
            disabled={isFlipped || isComplete}
            isFlipped={isFlipped}
            {...getSuitInfo(card)}
          />
        );
      })}
    </div>
  );
}
