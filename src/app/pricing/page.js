'use client'

import { useState } from 'react'
import { aiModels } from '../../data/models'
import { DollarSign, Calculator, TrendingUp } from 'lucide-react'

export default function PricingPage() {
  const [inputTokens, setInputTokens] = useState(1000)
  const [outputTokens, setOutputTokens] = useState(500)

  // 解析价格字符串为数字（每 1M tokens 的美元价格）
  const parsePrice = (priceStr) => {
    const match = priceStr.match(/\$?([\d.]+)\/(\d+)M? tokens?/i)
    if (!match) return null
    const price = parseFloat(match[1])
    const unit = parseInt(match[2]) * 1000000
    return price / unit // 每 token 的价格
  }

  // 计算成本
  const calculateCost = (model) => {
    const inputPrice = parsePrice(model.pricing.input)
    const outputPrice = parsePrice(model.pricing.output)
    
    if (!inputPrice || !outputPrice) return null
    
    const cost = (inputPrice * inputTokens) + (outputPrice * outputTokens)
    return cost.toFixed(4)
  }

  // 按价格排序
  const modelsWithCosts = aiModels.map(model => ({
    ...model,
    cost: calculateCost(model),
  })).filter(m => m.cost !== null)
    .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
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
              <a href="/pricing" className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                💰 价格
              </a>
              <a href="/news" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                📰 资讯
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cost Calculator */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">成本计算器</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入 Tokens 数量
              </label>
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => setInputTokens(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                约 {(inputTokens / 750).toFixed(1)} 个中文字符
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输出 Tokens 数量
              </label>
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => setOutputTokens(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                约 {(outputTokens / 750).toFixed(1)} 个中文字符
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              💡 提示：1000 tokens 约等于 750 个中文字符或 500-600 个英文单词
            </p>
          </div>
        </div>

        {/* Price Comparison */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">价格对比</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            基于输入 {inputTokens.toLocaleString()} tokens + 输出 {outputTokens.toLocaleString()} tokens 计算
          </p>
          
          <div className="space-y-4">
            {modelsWithCosts.map((model, index) => (
              <div
                key={model.id}
                className={`p-4 rounded-xl border-2 ${
                  index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-green-500 text-white' :
                      index === 1 ? 'bg-gray-300 text-white' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.company}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${model.cost}</div>
                    <div className="text-sm text-gray-500">本次调用成本</div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <span className="text-gray-500">输入价格：</span>
                    <span className="font-medium text-gray-900">{model.pricing.input}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">输出价格：</span>
                    <span className="font-medium text-gray-900">{model.pricing.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">订阅方案对比</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {aiModels.filter(m => m.pricing.subscription.includes('$20')).map(model => (
              <div key={model.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500">{model.company}</p>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600">$20</div>
                  <div className="text-gray-500">/ 月</div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-gray-600">优先访问新模型</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-gray-600">更高的使用限额</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-gray-600">更快的响应速度</span>
                  </li>
                </ul>
                
                <a
                  href={model.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                >
                  了解详情
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
