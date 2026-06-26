import { useEffect, useRef } from "react";

export default function ReadingModal({ flippedCards, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content" role="dialog" aria-label="牌阵解读">
        <h2 className="modal-title">
          <span className="modal-title-deco">━━━</span>
          牌阵解读
          <span className="modal-title-deco">━━━</span>
        </h2>

        <div className="readings-list">
          {flippedCards.map((entry, i) => {
            const meaning = entry.isReversed ? entry.card.reversed : entry.card.upright;
            return (
              <div key={i} className="reading-entry">
                <h3 className="reading-position">
                  【{entry.position}】{entry.card.name}
                  <span className={`orientation-tag ${entry.isReversed ? "reversed" : ""}`}>
                    {entry.orientation}
                  </span>
                </h3>
                <p className="reading-meaning">{meaning}</p>
              </div>
            );
          })}
        </div>

        <h2 className="modal-title modal-title-end">
          <span className="modal-title-deco">━━━</span>
          解读完毕
          <span className="modal-title-deco">━━━</span>
        </h2>

        <button className="modal-close-btn" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
