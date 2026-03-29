'use client'

import { useState } from 'react'
import Link from 'next/link'
import { aiModels, categories, scoreLabels } from '../data/models'
import { Trophy, TrendingUp, DollarSign, BookOpen, Compare, Search } from 'lucide-react'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('overall')
  const [searchQuery, setSearchQuery] = useState('')

  // 筛选和排序模型
  const filteredModels = aiModels
    .filter(model => {
      const matchCategory = activeCategory === 'all' ||
        (activeCategory === 'commercial' && model.tags.includes('商业')) ||
        (activeCategory === 'open-source' && model.tags.includes('开源')) ||
        (activeCategory === 'chinese' && model.tags.includes('中文优化')) ||
        (activeCategory === 'multimodal' && model.tags.includes('多模态'))
      
      const matchSearch = searchQuery === '' ||
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.company.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchCategory && matchSearch
    })
    .sort((a, b) => b.scores[sortBy] - a.scores[sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI 大模型指数</h1>
                <p className="text-xs text-gray-500">AI Model Index</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                🏆 排行榜
              </Link>
              <Link href="/compare" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                ⚖️ 对比
              </Link>
              <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                💰 价格
              </Link>
              <Link href="/news" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                📰 资讯
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">全球 AI 大模型排行榜</h2>
          <p className="text-xl text-blue-100 mb-8">
            全面对比性能、价格、功能，助您选择最适合的大模型
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索模型名称或公司..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            找到 <span className="font-semibold text-blue-600">{filteredModels.length}</span> 个模型
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="overall">综合评分</option>
              <option value="reasoning">逻辑推理</option>
              <option value="coding">代码能力</option>
              <option value="math">数学能力</option>
              <option value="creative">创意写作</option>
              <option value="language">语言表达</option>
            </select>
          </div>
        </div>

        {/* Model Cards */}
        <div className="grid gap-6">
          {filteredModels.map((model, index) => (
            <Link
              key={model.id}
              href={`/model/${model.id}`}
              className="block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      #{index + 1}
                    </div>
                    
                    {/* Model Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {model.company}
                        </span>
                        {model.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{model.description}</p>
                      
                      {/* Scores */}
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {Object.entries(model.scores).map(([key, score]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{score}</div>
                            <div className="text-xs text-gray-500">{scoreLabels[key]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-500">API 价格</div>
                    <div className="text-lg font-semibold text-green-600">{model.pricing.input}</div>
                    <div className="text-xs text-gray-400 mt-1">输入</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 AI 大模型指数 | 数据仅供参考，投资需谨慎
          </p>
        </div>
      </footer>
    </div>
  )
}
