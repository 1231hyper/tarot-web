# 塔罗答案之书 📖

一个基于 React + Vite 的塔罗牌占卜 Web 应用，采用魔法书页主题设计，支持 6 种牌阵类型与 AI 智能解读。

![Theme](https://img.shields.io/badge/theme-magic%20book-6b4ba8)
![React](https://img.shields.io/badge/React-19-61dafb)
![Vite](https://img.shields.io/badge/Vite-8-646cff)

## ✨ 功能特性

### 📖 魔法书交互
- **书页式 UI**：整个应用模拟一本魔法书，首页为目录，点击后翻页进入牌阵
- **3D 翻页动画**：使用 CSS 3D Transform 实现逼真的翻页效果
- **流畅的打开/关闭动画**：支持在关闭中途重新打开

### 🔮 6 种牌阵类型
| 牌阵 | 说明 | 可选布局 |
|------|------|----------|
| 每日指引 | 快速获取今日能量 | 单牌 / 三牌（时间之流） |
| 关系解读 | 分析两人关系状态 | 三牌 / 四牌 / 爱人之十字 |
| 事业指引 | 职场与决策参考 | 二选一牌阵 |
| 凯尔特十字 | 深度综合分析 | 十牌完整牌阵 |
| 问题解决 | 针对性问题分析 | 五牌问题解决牌阵 |
| 黄道十二宫 | 全方位年度运势 | 十二宫牌阵 |

### 🤖 AI 智能解读
- 根据牌阵类型自动生成专属提示词
- 支持 **DeepSeek**、**OpenAI**、**Anthropic (Claude)** 及 **自定义 API**
- 提示词根据实际牌数动态调整（单牌不会要求解读三张牌）
- 自动清理 AI 返回的 Markdown 格式符号

### 🎴 78 张完整塔罗牌
- 22 张大阿卡纳 + 56 张小阿卡纳
- 每张牌包含正位/逆位含义
- 随机洗牌 + 随机正逆位

### 🎨 视觉设计
- 深紫蓝魔法书主题
- 金色装饰边框与星尘粒子背景
- 响应式布局，支持移动端

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 pnpm

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd tarot-web

# 安装依赖
npm install
```

### 配置 API Key

在项目根目录创建 `.env` 文件：

```env
# DeepSeek（默认）
DEEPSEEK_API_KEY=sk-your-deepseek-key

# OpenAI（可选）
OPENAI_API_KEY=sk-your-openai-key

# Anthropic（可选）
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# 自定义 API（可选）
CUSTOM_API_KEY=your-custom-key
CUSTOM_API_BASE_URL=https://your-api.com/v1
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录下。

## 📖 使用教程

### 第一步：选择牌阵
1. 打开应用后，看到"塔罗答案之书"目录页
2. 点击感兴趣的牌阵类型展开子菜单
3. 选择具体布局（如"单牌阵 · 今日指引"）

### 第二步：翻开命运之页
- 选择后，书页会自动翻转到牌阵页面
- 左侧显示牌阵位置，右侧显示卡牌网格

### 第三步：选牌
1. 点击卡牌翻开（带 3D 翻转动画）
2. 每张牌随机正位/逆位
3. 按顺序填满所有位置

### 第四步：获取 AI 解读
- 选完所有牌后，自动弹出 AI 综合解读
- 包含整体解读 + 每张牌的单独含义

### 第五步：返回或重试
- 点击左上角"← 合上书本"返回目录
- 或点击"重新开始"按钮重新选牌

### 切换 API 提供商
1. 点击右上角 ⚙️ 设置按钮
2. 选择 API 提供商（DeepSeek / OpenAI / Anthropic / 自定义）
3. 可自定义模型名称（留空使用默认）

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| Vite | 8 | 构建工具 |
| CSS 3D Transforms | - | 翻页动画 |
| DeepSeek / OpenAI / Anthropic | - | AI 解读 API |

## 📁 项目结构

```
tarot-web/
├── api/
│   └── reading.js          # API 处理（生产环境）
├── src/
│   ├── components/
│   │   ├── Book.jsx         # 魔法书翻页组件
│   │   ├── BookOfAnswers.jsx # 目录页
│   │   ├── CardGrid.jsx     # 卡牌网格
│   │   ├── CardBack.jsx     # 单张卡牌
│   │   ├── PositionPanel.jsx # 牌阵位置面板
│   │   ├── ReadingModal.jsx # AI 解读弹窗
│   │   └── ApiSettings.jsx  # API 设置面板
│   ├── hooks/
│   │   ├── useTarot.js      # 塔罗牌逻辑
│   │   └── useAiReading.js  # AI 解读逻辑
│   ├── data/
│   │   └── cards.js         # 78 张牌数据 + 牌阵配置
│   ├── assets/
│   │   └── cards/           # 卡牌图片
│   ├── App.jsx              # 主应用
│   ├── App.css              # 全局样式
│   └── main.jsx             # 入口
├── vite.config.js           # Vite 配置（含 API 代理）
└── .env                     # API Key 配置
```

## 🔧 自定义配置

### 添加新牌阵
在 `src/data/cards.js` 的 `SPREADS` 对象中添加：

```javascript
mySpread: {
  id: 'mySpread',
  name: '我的牌阵',
  icon: '🔮',
  description: '自定义牌阵描述',
  layouts: [
    {
      key: 'layout1',
      label: '布局一',
      count: 3,
      positions: ['位置1', '位置2', '位置3'],
    },
  ],
},
```

然后在 `vite.config.js` 的 `buildPrompt` 函数中添加对应提示词。

### 修改主题颜色
在 `src/App.css` 的 `:root` 中修改 CSS 变量：

```css
:root {
  --bg-deep: #1a1a2e;        /* 背景色 */
  --accent: #c9a84c;         /* 强调色 */
  --text-primary: #2c1810;   /* 主文字色 */
}
```

## 📝 License

MIT
