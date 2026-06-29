// ── 按牌阵生成专属提示词 ──────────────────────────────
function buildPrompt(spreadId, layoutKey, cardInfo, cardCount) {
  const base = `你是一位资深塔罗牌占卜师，精通神秘学，擅长用诗意的语言解读塔罗牌阵。`;

  // 根据牌数动态调整字数要求和解读深度
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
3. 聚焦于这一张牌的单一信息，不要提及"多张牌"或"牌阵组合"
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
    return `${base}\n\n${cardInfo}\n\n请用中文撰写一段 ${lengthGuide} 的综合解读，聚焦于所给牌面信息。`;
  }
  const prompt = spreadPrompts[layoutKey] || Object.values(spreadPrompts)[0];
  return prompt;
}

// ── API Handler ──────────────────────────────────────
export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { cards, spreadId, layoutKey } = body;
  if (!Array.isArray(cards) || cards.length === 0) {
    return new Response(JSON.stringify({ error: "缺少卡牌数据" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "服务未配置" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const cardInfo = cards
    .map((c) => {
      const meaning = c.isReversed ? c.card.reversed : c.card.upright;
      return `【${c.position}】${c.card.name}（${c.orientation}）\n含义：${meaning}`;
    })
    .join("\n\n");

  const prompt = buildPrompt(spreadId, layoutKey, cardInfo, cards.length);

  try {
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "你是一位资深塔罗牌占卜师，精通神秘学，擅长用诗意的语言解读塔罗牌阵。",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 400,
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || "DeepSeek API 调用失败");
    }

    const data = await res.json();
    const reading = data.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ reading }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "解读生成失败" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
