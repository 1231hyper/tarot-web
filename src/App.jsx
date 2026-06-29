import { useState, useEffect, useCallback } from "react";
import useTarot from "./hooks/useTarot";
import useAiReading from "./hooks/useAiReading";
import Book from "./components/Book";
import BookOfAnswers from "./components/BookOfAnswers";
import CardGrid from "./components/CardGrid";
import PositionPanel from "./components/PositionPanel";
import ReadingModal from "./components/ReadingModal";
import ApiSettings, { getApiSettings } from "./components/ApiSettings";
import "./App.css";

export default function App() {
  const [spreadConfig, setSpreadConfig] = useState(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const maxCards = spreadConfig?.maxCards || 3;
  const positions = spreadConfig?.positions || [];
  const displayLimit = maxCards <= 5 ? 21 : maxCards <= 10 ? 24 : 12;
  const spreadKey = spreadConfig ? `${spreadConfig.spreadId}-${spreadConfig.layoutKey}` : "default";

  const {
    displayCards,
    selectedCards,
    isComplete,
    flipCard,
    restart,
  } = useTarot({ maxCards, positions, spreadKey, animationDelay: 1500, displayLimit });

  const { reading, loading, error, fetchReading, resetReading } = useAiReading();

  // 选牌完成且书本打开时才显示弹窗
  useEffect(() => {
    console.log('[modal effect]', { isComplete, spreadConfig: !!spreadConfig, bookOpen, showModal });
    if (isComplete && spreadConfig && bookOpen) {
      resetReading();
      const timer = setTimeout(() => {
        console.log('[modal timer] showing modal');
        setShowModal(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isComplete, spreadConfig, bookOpen]);

  const handleSelectSpread = useCallback((spreadId, layoutKey, count, posList, label) => {
    console.log('[handleSelectSpread]', spreadId, layoutKey, count);
    setSpreadConfig({ spreadId, layoutKey, maxCards: count, positions: posList, label });
    setShowModal(false);
    resetReading();
    setBookOpen(true);
  }, [resetReading]);

  const handleBack = useCallback(() => {
    console.log('[handleBack] closing book');
    setClosing(true);
    setBookOpen(false);
    setTimeout(() => {
      console.log('[handleBack] resetting state');
      setSpreadConfig(null);
      setShowModal(false);
      resetReading();
      restart();
      setClosing(false);
    }, 1100);
  }, [restart, resetReading]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const [apiProvider, setApiProvider] = useState(() => getApiSettings().provider);
  const [apiModel, setApiModel] = useState(() => getApiSettings().model);

  const handleApiSettings = useCallback((provider, model) => {
    setApiProvider(provider);
    setApiModel(model);
  }, []);

  const handleFetch = useCallback(
    (cards) => fetchReading(cards, spreadConfig.spreadId, spreadConfig.layoutKey, apiProvider, apiModel),
    [fetchReading, spreadConfig?.spreadId, spreadConfig?.layoutKey, apiProvider, apiModel]
  );

  const coverContent = (
    <BookOfAnswers onSelectSpread={handleSelectSpread} />
  );

  const insideContent = (
    <div className="inside-spread">
      <div className="inside-header">
        <h2 className="inside-title">{spreadConfig?.label ?? "请选择牌阵"}</h2>
        <span className="inside-card-count">{maxCards} 张牌</span>
      </div>

      <div className="inside-body">
        <PositionPanel
          selectedCards={selectedCards}
          positions={positions}
          onRestart={restart}
        />

        <main className="card-area">
          <CardGrid
            cards={displayCards}
            selectedCards={selectedCards}
            onFlip={flipCard}
            isComplete={isComplete}
          />
          <p className="card-hint" aria-live="polite" aria-atomic="true">
            {isComplete
              ? "已选完全部牌，查看解读结果"
              : (
                <>
                  点击卡牌翻开，共需选择
                  {" "}<span className="hint-num">{maxCards}</span>
                  {" "}张牌（已选{" "}
                  <span className="hint-num">{selectedCards.length}</span>
                  /<span className="hint-num">{maxCards}</span>）
                </>
              )}
          </p>
        </main>
      </div>
    </div>
  );

  return (
    <div className="app">
      <ApiSettings onSelectProvider={handleApiSettings} />
      <div className="book-wrapper">
        <Book
          cover={coverContent}
          inside={insideContent}
          isOpen={bookOpen}
        />
        {(bookOpen || closing) && (
          <button className="close-book-btn" onClick={handleBack} disabled={closing}>
            ← 合上书本
          </button>
        )}
      </div>

      {showModal && (
        <ReadingModal
          flippedCards={selectedCards}
          onClose={handleCloseModal}
          reading={reading}
          loading={loading}
          error={error}
          onFetch={handleFetch}
        />
      )}
    </div>
  );
}
