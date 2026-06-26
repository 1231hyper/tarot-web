import CardBack from "./CardBack";

// 判断牌的花色和索引
function getSuitInfo(card, allCards) {
  const idx = allCards.findIndex((c) => c.name === card.name);
  if (idx < 22) return { suit: "Major", majorIndex: idx, minorIndex: 0 };
  if (idx < 36) return { suit: "Wands", majorIndex: -1, minorIndex: idx - 22 };
  if (idx < 50) return { suit: "Cups", majorIndex: -1, minorIndex: idx - 36 };
  if (idx < 64) return { suit: "Swords", majorIndex: -1, minorIndex: idx - 50 };
  return { suit: "Pentacles", majorIndex: -1, minorIndex: idx - 64 };
}

export default function CardGrid({ cards, selectedCards, onFlip, isComplete }) {
  const selectedNames = new Set(selectedCards.map((c) => c.card.name));

  return (
    <div className="card-grid">
      {cards.map((card, idx) => {
        const isFlipped = selectedNames.has(card.name);
        const suitInfo = getSuitInfo(card, cards);
        return (
          <CardBack
            key={`${card.name}-${idx}`}
            card={card}
            onClick={() => onFlip(card)}
            disabled={isFlipped || isComplete}
            isFlipped={isFlipped}
            {...suitInfo}
          />
        );
      })}
    </div>
  );
}
