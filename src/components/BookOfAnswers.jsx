import { useState } from "react";
import { SPREADS } from "../data/cards";

export default function BookOfAnswers({ onSelectSpread }) {
  const [expanded, setExpanded] = useState(null);

  const spreadList = Object.values(SPREADS);

  return (
    <div className="book-of-answers">
      <div className="book-header">
        <div className="book-icon">📖</div>
        <h1 className="book-title">塔罗答案之书</h1>
        <p className="book-subtitle">
          静心冥想你的问题，翻开目录选择牌阵
        </p>
      </div>

      <div className="book-directory">
        {spreadList.map((spread) => (
          <div
            key={spread.id}
            className={`directory-item ${expanded === spread.id ? "expanded" : ""}`}
          >
            <button
              className="directory-header"
              onClick={() => setExpanded(expanded === spread.id ? null : spread.id)}
            >
              <span className="directory-icon">{spread.icon}</span>
              <div className="directory-title-group">
                <h2 className="directory-name">{spread.name}</h2>
                <p className="directory-desc">{spread.description}</p>
              </div>
              <span className="directory-arrow">
                {expanded === spread.id ? "▲" : "▼"}
              </span>
            </button>

            {expanded === spread.id && (
              <div className="layout-options">
                {spread.layouts.map((layout) => (
                  <button
                    key={layout.key}
                    className="layout-btn"
                    onClick={() => onSelectSpread(spread.id, layout.key, layout.count, layout.positions, layout.label)}
                  >
                    <span className="layout-label">{layout.label}</span>
                    <span className="layout-count">{layout.count} 张牌</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="book-footer">
        <p>🃏 78 张塔罗牌 · 大阿卡纳 22 · 小阿卡纳 56</p>
      </div>
    </div>
  );
}
