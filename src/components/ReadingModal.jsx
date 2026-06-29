import { useEffect, useRef } from "react";

// 清理 AI 返回文本中的 Markdown 格式符号
function cleanReading(text) {
  return text
    .replace(/\*{1,3}/g, "")   // 移除 * ** ***
    .replace(/#{1,6}\s?/g, "")  // 移除 # ## ### 等标题标记
    .replace(/_{1,3}/g, "")     // 移除 _ __ ___
    .replace(/`/g, "")          // 移除反引号
    .replace(/---/g, "")        // 移除分隔线
    .trim();
}

export default function ReadingModal({
  flippedCards,
  onClose,
  reading,
  loading,
  error,
  onFetch,
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // 弹窗打开时请求 AI 解读（仅在首次打开且未加载时请求，防止重复调用）
  useEffect(() => {
    if (flippedCards?.length && !loading && !reading) {
      onFetch(flippedCards);
    }
  }, [flippedCards, onFetch, loading, reading]);

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

        {/* AI 综合解读 */}
        <div className="ai-reading">
          {loading && (
            <div className="ai-loading">
              <span className="ai-loading-spinner" />
              <span>AI 正在综合解读...</span>
            </div>
          )}
          {error && (
            <div className="ai-error">
              <span>{error}</span>
              <button className="ai-retry-btn" onClick={() => onFetch(flippedCards)}>
                重试
              </button>
            </div>
          )}
          {reading && (
            <div className="ai-reading-content">
              <div className="ai-reading-badge">AI 综合解读</div>
              <p>{cleanReading(reading)}</p>
            </div>
          )}
        </div>

        {/* 单牌含义 */}
        <div className="readings-list">
          {flippedCards.map((entry, i) => {
            const meaning = entry.isReversed
              ? entry.card.reversed
              : entry.card.upright;
            return (
              <div key={i} className="reading-entry">
                <h3 className="reading-position">
                  【{entry.position}】{entry.card.name}
                  <span
                    className={`orientation-tag ${entry.isReversed ? "reversed" : ""}`}
                  >
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
