import { POSITIONS } from "../data/cards";

export default function PositionPanel({ selectedCards, onRestart }) {
  return (
    <aside className="position-panel">
      <h2 className="panel-title">已选牌阵</h2>
      <div className="positions-list">
        {POSITIONS.map((pos, i) => {
          const selected = selectedCards[i];
          return (
            <div key={pos} className={`position-slot ${selected ? "filled" : ""}`}>
              <span className="position-label">【{pos}】</span>
              {selected ? (
                <span className="position-card-name">
                  {selected.card.name}
                  <span className={`orientation-tag ${selected.isReversed ? "reversed" : ""}`}>
                    {selected.orientation}
                  </span>
                </span>
              ) : (
                <span className="position-empty">（待翻牌）</span>
              )}
            </div>
          );
        })}
      </div>
      <button className="restart-btn" onClick={onRestart}>
        重新开始
      </button>
    </aside>
  );
}
