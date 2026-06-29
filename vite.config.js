import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── 按牌阵生成专属提示词 ──────────────────────────────
function buildPrompt(spreadId, layoutKey, cardInfo, cardCount) {
  const base = `你是一位资深塔罗牌占卜师，精通神秘学，擅长用诗意的语言解读塔罗牌阵。`;

  const lengthGuide = cardCount === 1
    ? "60-80 字"
    : cardCount <= 3
      ? "100-150 字"
      : cardCount <= 5
        ? "150-200 字"
        : "200-300 字";

  const prompts = {
    daily: {
      single: `${base}

【单牌阵 · 今日指引】（共 1 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 以神秘学风格开场，分析这张牌的象征元素与今日能量的呼应
2. 结合牌面正逆位，给出今日核心建议与注意事项
3. 聚焦于这一张牌的单一信息，绝对不要提及"多张牌"、"牌阵组合"或"三张牌"
4. 语气温暖而有洞察力，适合快速阅读，像一封来自宇宙的便签`,

      three: `${base}

【三牌阵 · 时间之流】（过去 → 现在 → 未来，共 3 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 以神秘学风格开场，分析牌面象征与元素
2. 结合过去→现在→未来的时间线，揭示内在联系与发展脉络
3. 结尾给出 1-2 条实用的生活建议
4. 语气温暖而有洞察力，避免过于宿命论`,
    },

    relationship: {
      relation3: `${base}

【关系牌阵】（你的状态 / 对方状态 / 关系走向，共 3 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 分析双方在关系中的能量状态与心理倾向
2. 揭示两人互动中的核心张力或和谐点
3. 结合关系走向牌给出建议
4. 语气温暖客观，不偏不倚，避免宿命论`,

      relation4: `${base}

【关系牌阵】（你的状态 / 对方状态 / 目前互动 / 未来发展，共 4 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 分别分析双方在关系中的位置与能量
2. 解读当前互动模式中的关键动力
3. 结合最后一张牌给出关系发展趋势与实用建议
4. 语气温暖而有同理心，避免过于判断性`,

      venus: `${base}

【爱人之十字牌阵】（你的内心 / 对方的内心 / 你的外在 / 对方的外在 / 潜在阻碍，共 5 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 深入剖析双方的内心真实想法与外在表现之间的差异
2. 解读两人关系中的核心阻碍与突破方向
3. 给出具体可行的关系改善建议
4. 语气温暖深刻，富有同理心，避免过于悲观`,
    },

    career: {
      choice: `${base}

【二选一牌阵】（目前状况 / 选择A现状 / 选择A结果 / 选择B现状 / 选择B结果，共 5 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 先分析求问者当前的整体状况与心境
2. 分别解读两个选择的阻碍与最终结果
3. 对比两条路径的优劣，给出清晰的决策参考
4. 语气理性而洞察，避免替求问者做决定`,
    },

    celtic: {
      celtic: `${base}

【凯尔特十字牌阵】（核心问题 / 当前阻碍 / 潜意识基础 / 过去经历 / 短期未来 / 自我认知 / 外在环境 / 恐惧与希望 / 最终结果 / 综合建议，共 10 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 以神秘学风格开场，整体把握牌阵的能量场
2. 逐层分析：核心问题→阻碍→潜意识根源→过去影响→短期走向
3. 解读自我认知与外在环境的互动，以及内心恐惧与希望的张力
4. 综合所有牌面给出最终方向与 2-3 条具体建议
5. 语气深邃而有洞察力，像一位智者的谆谆教诲`,
    },

    problem: {
      problem: `${base}

【问题解决牌阵】（问题本质/盲点 / 导致原因 / 应采取行动 / 行动后走向，共 5 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 以敏锐的视角揭示问题的本质与求问者可能忽视的盲点
2. 分析导致问题的深层原因
3. 给出具体、可操作的行动建议
4. 结合最后一张牌展望行动后的积极走向
5. 语气务实而鼓励，避免空泛的安慰`,
    },

    zodiac: {
      zodiac: `${base}

【黄道十二宫牌阵】（自我 / 财务 / 沟通 / 家庭 / 恋爱 / 健康 / 婚姻 / 投资 / 进修 / 事业 / 人际 / 潜意识，共 12 张牌）

${cardInfo}

请用中文撰写一段 ${lengthGuide} 的综合解读，要求：
1. 以神秘学风格开场，描绘整年/整体的能量画卷
2. 按领域逐一简要点拨，每个领域 1-2 句核心建议
3. 找出 2-3 个需要特别关注的领域并深入分析
4. 结尾给出整体性的生活建议与鼓励
5. 语气温暖而宏大，像一幅徐徐展开的星图`,
    },
  };

  const spreadPrompts = prompts[spreadId];
  if (!spreadPrompts) {
    return `${base}\n\n${cardInfo}\n\n请用中文撰写一段 ${lengthGuide} 的综合解读，聚焦于所给牌面信息，绝对不要提及与实际牌数不符的内容。`;
  }
  return spreadPrompts[layoutKey] || Object.values(spreadPrompts)[0];
}

// 从 .env 文件读取指定 key
function readEnvKey(key) {
  try {
    const envPath = resolve(__dirname, '.env')
    const content = readFileSync(envPath, 'utf-8')
    const line = content.split('\n').find(l => l.startsWith(`${key}=`))
    if (line) return line.slice(key.length + 1).trim()
  } catch {}
  return ''
}

// API 提供商配置
const API_CONFIGS = {
  deepseek: {
    label: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    envKey: 'DEEPSEEK_API_KEY',
  },
  openai: {
    label: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
    envKey: 'OPENAI_API_KEY',
  },
  anthropic: {
    label: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-3-haiku-20240307',
    envKey: 'ANTHROPIC_API_KEY',
  },
  custom: {
    label: '自定义',
    baseUrl: '',
    defaultModel: '',
    envKey: 'CUSTOM_API_KEY',
  },
};

// 本地开发代理：支持多 API 提供商
function apiProxy() {
  return {
    name: 'api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/reading', async (req, res) => {
        // CORS 预检
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 204;
          res.end();
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        // 读取请求体
        const body = await new Promise((resolve, reject) => {
          let data = '';
          req.on('data', chunk => { data += chunk; });
          req.on('end', () => resolve(data));
          req.on('error', reject);
        });

        let parsed;
        try { parsed = JSON.parse(body); } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: '请求体 JSON 解析失败' }));
          return;
        }

        const { cards, spreadId, layoutKey, provider = 'deepseek', model: customModel } = parsed;
        if (!Array.isArray(cards) || cards.length === 0) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: '缺少卡牌数据' }));
          return;
        }

        // 获取 API 配置
        const config = API_CONFIGS[provider] || API_CONFIGS.deepseek;
        const apiKey = readEnvKey(config.envKey);
        if (!apiKey) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: `请先在 .env 文件中配置 ${config.envKey}` }));
          return;
        }

        const cardInfo = cards.map(c => {
          const meaning = c.isReversed ? c.card.reversed : c.card.upright;
          return `【${c.position}】${c.card.name}（${c.orientation}）\n含义：${meaning}`;
        }).join('\n\n');

        const prompt = buildPrompt(spreadId, layoutKey, cardInfo, cards.length);
        const model = customModel || config.defaultModel;

        try {
          let reading;

          if (provider === 'anthropic') {
            // Anthropic Messages API
            const fetchRes = await fetch(`${config.baseUrl}/messages`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
              },
              body: JSON.stringify({
                model,
                max_tokens: 400,
                system: '你是一位资深塔罗牌占卜师，精通神秘学，擅长用诗意的语言解读塔罗牌阵。',
                messages: [{ role: 'user', content: prompt }],
              }),
            });
            const data = await fetchRes.json();
            if (data.error) throw new Error(data.error.message || 'Anthropic 返回错误');
            reading = data.content?.[0]?.text?.trim();
          } else {
            // OpenAI / DeepSeek / 自定义 (OpenAI 兼容格式)
            const baseUrl = config.baseUrl || readEnvKey('CUSTOM_API_BASE_URL');
            if (!baseUrl) throw new Error('请配置 CUSTOM_API_BASE_URL');

            const fetchRes = await fetch(`${baseUrl}/chat/completions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model,
                messages: [
                  { role: 'system', content: '你是一位资深塔罗牌占卜师，精通神秘学，擅长用诗意的语言解读塔罗牌阵。' },
                  { role: 'user', content: prompt },
                ],
                max_tokens: 400,
                temperature: 0.8,
              }),
            });
            const data = await fetchRes.json();
            if (data.error) throw new Error(data.error.message || 'API 返回错误');
            reading = data.choices?.[0]?.message?.content?.trim();
          }

          res.end(JSON.stringify({ reading }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: `请求失败: ${err.message}` }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiProxy()],
  base: '/tarot-web/',
})
