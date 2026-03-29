'use client'

import { Calendar, ExternalLink } from 'lucide-react'

// 模拟新闻数据
const newsData = [
  {
    id: 1,
    title: 'OpenAI 发布 GPT-4o 最新升级，多模态能力再提升',
    summary: 'OpenAI 宣布 GPT-4o 迎来重大更新，在图像理解和语音交互方面取得突破性进展。新版本能够更准确地识别复杂图表和公式，语音对话延迟降低至 200 毫秒以内。',
    source: 'AI 科技评论',
    date: '2026-03-28',
    category: '产品动态',
    tags: ['OpenAI', 'GPT-4o', '多模态'],
  },
  {
    id: 2,
    title: 'Anthropic 完成新一轮融资，估值突破 200 亿美元',
    summary: 'AI 安全公司 Anthropic 宣布完成由 Spark Capital 领投的 15 亿美元融资，投后估值超过 200 亿美元。公司表示将加速 Claude 系列模型的研发和商业化。',
    source: '36 氪',
    date: '2026-03-27',
    category: '投融资',
    tags: ['Anthropic', 'Claude', '融资'],
  },
  {
    id: 3,
    title: '阿里云通义千问开源新模型，性能媲美闭源产品',
    summary: '阿里云发布通义千问最新开源模型 Qwen2.5-72B，在多个基准测试中表现优异，接近 GPT-4 水平。该模型已上线 Hugging Face，获得开发者广泛关注。',
    source: '机器之心',
    date: '2026-03-26',
    category: '开源动态',
    tags: ['阿里云', '通义千问', '开源'],
  },
  {
    id: 4,
    title: 'Google Gemini 新增代码执行功能，可直接运行 Python 代码',
    summary: 'Google 为 Gemini 系列模型添加代码执行能力，用户可直接在对话中运行 Python 代码并查看结果。该功能目前向 Gemini Advanced 订阅用户开放。',
    source: 'InfoQ',
    date: '2026-03-25',
    category: '产品动态',
    tags: ['Google', 'Gemini', '代码执行'],
  },
  {
    id: 5,
    title: 'Meta Llama 4 传闻即将发布，或支持 10M 上下文窗口',
    summary: '据业内人士透露，Meta 正在开发 Llama 4 系列模型，最大版本可能支持高达 1000 万 tokens 的上下文窗口。如果属实，将再次刷新行业记录。',
    source: 'The Verge',
    date: '2026-03-24',
    category: '行业传闻',
    tags: ['Meta', 'Llama', '开源'],
  },
  {
    id: 6,
    title: '百度文心一言 4.5 上线，知识截止 2025 年 1 月',
    summary: '百度宣布文心一言 4.5 正式上线，知识库更新至 2025 年 1 月。新版本在逻辑推理和数学计算方面有显著提升，API 价格保持不变。',
    source: '百度 AI',
    date: '2026-03-23',
    category: '产品动态',
    tags: ['百度', '文心一言'],
  },
  {
    id: 7,
    title: '欧盟 AI 法案正式生效，大模型厂商面临合规挑战',
    summary: '欧盟《人工智能法案》于 3 月 1 日正式生效，对通用 AI 模型提出透明度要求。OpenAI、Google 等公司需披露训练数据摘要和模型能力边界。',
    source: '财新',
    date: '2026-03-22',
    category: '政策法规',
    tags: ['欧盟', 'AI 法案', '合规'],
  },
  {
    id: 8,
    title: '字节跳动豆包大模型日活突破 1000 万',
    summary: '字节跳动宣布豆包大模型日活跃用户突破 1000 万，成为国内增长最快的大模型应用。公司计划年内推出面向企业的专业版服务。',
    source: '晚点 LatePost',
    date: '2026-03-21',
    category: '市场动态',
    tags: ['字节跳动', '豆包'],
  },
]

const categories = ['全部', '产品动态', '投融资', '开源动态', '行业传闻', '政策法规', '市场动态']

export default function NewsPage() {
  const selectedCategory = '全部'

  const filteredNews = selectedCategory === '全部' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📰</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI 大模型指数</h1>
            </div>
            
            <nav className="flex items-center space-x-1">
              <a href="/" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                🏆 排行榜
              </a>
              <a href="/compare" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                ⚖️ 对比
              </a>
              <a href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                💰 价格
              </a>
              <a href="/news" className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                📰 资讯
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">AI 行业资讯</h1>
          <p className="text-blue-100">追踪全球大模型最新动态，把握行业发展脉搏</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="grid gap-6">
          {filteredNews.map(news => (
            <article
              key={news.id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {news.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {news.date}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{news.source}</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{news.summary}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {news.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
                  <span>阅读全文</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
