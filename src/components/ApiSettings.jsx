import { useState, useEffect } from "react";
import { API_PROVIDERS } from "../hooks/useAiReading";

const STORAGE_KEY = "tarot_api_settings";

export function getApiSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { provider: "deepseek", model: "" };
}

export default function ApiSettings({ onSelectProvider }) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(getApiSettings);
  const [modelInput, setModelInput] = useState(settings.model || "");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    onSelectProvider?.(settings.provider, settings.model);
  }, [settings, onSelectProvider]);

  const handleProviderChange = (provider) => {
    const defaultModel = API_PROVIDERS[provider]?.defaultModel || "";
    setSettings({ provider, model: defaultModel });
    setModelInput(defaultModel);
  };

  return (
    <div className="api-settings">
      <button
        className="api-settings-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="API 设置"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="api-settings-panel">
          <h3>API 设置</h3>

          <div className="api-settings-field">
            <label>提供商</label>
            <select
              value={settings.provider}
              onChange={(e) => handleProviderChange(e.target.value)}
            >
              {Object.entries(API_PROVIDERS).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>

          <div className="api-settings-field">
            <label>模型（可选，留空使用默认）</label>
            <input
              type="text"
              value={modelInput}
              onChange={(e) => setModelInput(e.target.value)}
              onBlur={() => setSettings((s) => ({ ...s, model: modelInput }))}
              placeholder={API_PROVIDERS[settings.provider]?.defaultModel || "输入模型名称"}
            />
          </div>

          <div className="api-settings-info">
            {settings.provider === "deepseek" && <p>需要配置 .env 中的 DEEPSEEK_API_KEY</p>}
            {settings.provider === "openai" && <p>需要配置 .env 中的 OPENAI_API_KEY</p>}
            {settings.provider === "anthropic" && <p>需要配置 .env 中的 ANTHROPIC_API_KEY</p>}
            {settings.provider === "custom" && <p>需要配置 CUSTOM_API_KEY 和 CUSTOM_API_BASE_URL</p>}
          </div>
        </div>
      )}
    </div>
  );
}
