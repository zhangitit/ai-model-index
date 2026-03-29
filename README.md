# AI 大模型指数网站

全球 AI 大模型排行榜和对比平台，提供全面的模型信息、价格对比和行业资讯。

## 🚀 功能特性

- **🏆 排行榜** - 按综合评分和各项能力排序
- **⚖️ 模型对比** - 多选模型进行详细对比
- **💰 价格对比** - API 价格和订阅方案对比，成本计算器
- **📰 行业资讯** - 最新大模型动态和新闻
- **📖 模型详情** - 公司背景、产品迭代、能力评分

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **部署**: Vercel (静态导出)

## 📦 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 🚀 部署上线

### 方式一：Vercel 部署（推荐）

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 部署项目：
```bash
vercel --prod
```

4. 获取访问链接

### 方式二：Netlify 部署

1. 构建项目：
```bash
npm run build
```

2. 将 `out` 文件夹上传到 Netlify

### 方式三：GitHub Pages

1. 构建项目：
```bash
npm run build
```

2. 将 `out` 文件夹内容推送到 GitHub 仓库的 gh-pages 分支

## 📁 项目结构

```
ai-model-index/
├── src/
│   ├── app/
│   │   ├── page.js          # 首页（排行榜）
│   │   ├── layout.js        # 根布局
│   │   ├── globals.css      # 全局样式
│   │   ├── compare/         # 对比页面
│   │   ├── pricing/         # 价格页面
│   │   ├── news/            # 资讯页面
│   │   └── model/[id]/      # 模型详情页
│   └── data/
│       └── models.js        # 模型数据
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 📊 数据说明

模型数据存储在 `src/data/models.js` 中，包含：
- 基本信息（名称、公司、描述）
- 能力评分（综合、推理、代码、数学、创意、语言）
- 技术规格（参数量、训练数据、上下文窗口）
- 价格信息（输入/输出价格、订阅方案）
- 产品迭代历史
- 公司背景信息

## 📝 添加新模型

在 `src/data/models.js` 的 `aiModels` 数组中添加新对象：

```javascript
{
  id: 'unique-id',
  name: '模型名称',
  company: '公司名称',
  companyInfo: '公司背景介绍',
  releaseDate: 'YYYY-MM-DD',
  description: '模型描述',
  scores: {
    overall: 95,
    reasoning: 96,
    coding: 94,
    math: 93,
    creative: 97,
    language: 98,
  },
  params: '参数量',
  trainingData: '训练数据截止时间',
  contextWindow: '上下文窗口',
  pricing: {
    input: '输入价格',
    output: '输出价格',
    subscription: '订阅方案',
  },
  versions: [
    { version: '版本号', date: '日期', changes: '更新内容' }
  ],
  tags: ['标签 1', '标签 2'],
  website: '官网链接',
}
```

## 📄 许可证

MIT License

---

**AI 大模型指数** - 让大模型选择更简单
