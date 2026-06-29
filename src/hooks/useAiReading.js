import { useState, useCallback } from "react";

// API 提供商配置
export const API_PROVIDERS = {
  deepseek: {
    label: "DeepSeek",
    endpoint: "/api/reading",
    defaultModel: "deepseek-chat",
  },
  openai: {
    label: "OpenAI",
    endpoint: "/api/reading",
    defaultModel: "gpt-4o-mini",
  },
  anthropic: {
    label: "Anthropic (Claude)",
    endpoint: "/api/reading",
    defaultModel: "claude-3-haiku-20240307",
  },
  custom: {
    label: "自定义 API",
    endpoint: "/api/reading",
    defaultModel: "",
  },
};

export default function useAiReading() {
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReading = useCallback(async (cards, spreadId, layoutKey, provider = "deepseek") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards, spreadId, layoutKey, provider }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "解读生成失败，请重试");
      }
      const data = await res.json();
      setReading(data.reading);
    } catch (err) {
      setError(err.message || "网络错误");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetReading = useCallback(() => {
    setReading(null);
    setError(null);
  }, []);

  return { reading, loading, error, fetchReading, resetReading };
}
