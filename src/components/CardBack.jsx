import { useState } from "react";
import CardFace from "./CardFace";

export default function CardBack({ card, onClick, disabled, isFlipped, suit, majorIndex, minorIndex }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={`card-back ${disabled ? "disabled" : ""} ${isFlipped ? "flipped" : ""}`}
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled) onClick();
        }
      }}
      aria-label={isFlipped ? `${card.name}（已翻开）` : `翻开 ${card.name}`}
    >
      <div className={`card-inner ${pressed && !isFlipped ? "pressed" : ""}`}>
        {/* 正面 - 牌背 */}
        <div className="card-face card-face-front">
          <span className="card-symbol">?</span>
        </div>
        {/* 背面 - 翻牌后显示 */}
        <div className="card-face card-face-back">
          <CardFace
            card={card}
            suit={suit}
            majorIndex={majorIndex}
            minorIndex={minorIndex}
          />
        </div>
      </div>
    </div>
  );
}
