import { useState, useEffect, useRef } from "react";

/**
 * 魔法书组件
 * @param {Object} props
 * @param {ReactNode} props.cover - 封面内容（目录）
 * @param {ReactNode} props.inside - 内页内容（牌阵）
 * @param {boolean} isOpen - 是否翻开
 */
export default function Book({ cover, inside, isOpen }) {
  const [phase, setPhase] = useState("closed");
  const timerRef = useRef(null);

  useEffect(() => {
    console.log('[Book effect]', { isOpen, phase });
    if (isOpen && (phase === "closed" || phase === "closing")) {
      setPhase("opening");
      timerRef.current = setTimeout(() => setPhase("open"), 1000);
    } else if (!isOpen && (phase === "open" || phase === "opening")) {
      setPhase("closing");
      timerRef.current = setTimeout(() => setPhase("closed"), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, phase]);

  // 关闭状态显示封面内容（目录），打开状态显示内页内容（牌阵）
  const insideContent = phase === "closed" || phase === "closing" ? cover : inside;

  return (
    <div className="book-scene">
      <div className={`book ${phase}`}>
        <div className="book-back-cover">
          <div className="back-cover-inner">
            <div className="cover-decoration">
              <span className="deco-star">✦</span>
              <div className="deco-line" />
              <span className="deco-star">✦</span>
            </div>
            <p className="back-cover-text">Tarot</p>
            <div className="cover-decoration">
              <span className="deco-star">✦</span>
              <div className="deco-line" />
              <span className="deco-star">✦</span>
            </div>
          </div>
        </div>

        <div className="book-inside">
          <div className="book-inside-content">
            {insideContent}
          </div>
        </div>

        <div className={`book-cover ${phase}`}>
          <div className="cover-face cover-front">
            {cover}
          </div>
          <div className="cover-face cover-back">
            <div className="cover-back-inner">
              <div className="cover-decoration">
                <span className="deco-star">✦</span>
                <div className="deco-line" />
                <span className="deco-star small">✧</span>
                <div className="deco-line" />
                <span className="deco-star">✦</span>
              </div>
              <p className="cover-back-text">塔罗答案之书</p>
              <p className="cover-back-subtitle">— 翻开命运之页 —</p>
              <div className="cover-decoration">
                <span className="deco-star">✦</span>
                <div className="deco-line" />
                <span className="deco-star">✦</span>
              </div>
            </div>
          </div>
        </div>

        <div className="book-spine" />
      </div>
    </div>
  );
}
