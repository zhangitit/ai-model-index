'use client'

import { useState } from 'react'
import { aiModels, scoreLabels } from '../../data/models'
import { Check, X } from 'lucide-react'

export default function ComparePage() {
  const [selectedModels, setSelectedModels] = useState([])

  const toggleModel = (modelId) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter(id => id !== modelId))
    } else if (selectedModels.length < 4) {
      setSelectedModels([...selectedModels, modelId])
    }
  }

  const selectedModelData = aiModels.filter(m => selectedModels.includes(m.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚖️</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI 大模型指数</h1>
            </div>
            
            <nav className="flex items-center space-x-1">
              <a href="/" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                🏆 排行榜
              </a>
              <a href="/compare" className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                ⚖️ 对比
              </a>
              <a href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
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
        {/* Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">选择要对比的模型</h2>
          <p className="text-gray-600 mb-4">最多可选择 4 个模型进行对比（已选 {selectedModels.length}/4）</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiModels.map(model => (
              <button
                key={model.id}
                onClick={() => toggleModel(model.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedModels.includes(model.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{model.name}</span>
                  {selectedModels.includes(model.id) ? (
                    <Check className="w-5 h-5 text-blue-600" />
                  ) : (
                    <div className="w-5 h-5"></div>
                  )}
                </div>
                <div className="text-sm text-gray-500">{model.company}</div>
                <div className="text-sm text-blue-600 font-medium mt-1">评分：{model.scores.overall}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedModelData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">对比项</th>
                    {selectedModelData.map(model => (
                      <th key={model.id} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <div>{model.name}</div>
                        <div className="text-gray-500 font-normal">{model.company}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Basic Info */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">发布日期</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4 text-sm text-gray-600">{model.releaseDate}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">参数量</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4 text-sm text-gray-600">{model.params}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">上下文窗口</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4 text-sm text-gray-600">{model.contextWindow}</td>
                    ))}
                  </tr>
                  
                  {/* Scores */}
                  {Object.entries(scoreLabels).map(([key, label]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{label}</td>
                      {selectedModelData.map(model => {
                        const score = model.scores[key]
                        const maxScore = Math.max(...selectedModelData.map(m => m.scores[key]))
                        return (
                          <td key={model.id} className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm font-semibold ${
                                score === maxScore ? 'text-green-600' : 'text-gray-600'
                              }`}>{score}</span>
                              {score === maxScore && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">最佳</span>
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  
                  {/* Pricing */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">输入价格</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4 text-sm text-gray-600">{model.pricing.input}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">输出价格</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4 text-sm text-gray-600">{model.pricing.output}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">订阅方案</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4 text-sm text-gray-600">{model.pricing.subscription}</td>
                    ))}
                  </tr>
                  
                  {/* Tags */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">标签</td>
                    {selectedModelData.map(model => (
                      <td key={model.id} className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {model.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedModelData.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">⚖️</span>
            <p className="text-gray-500">请从上方选择至少 2 个模型进行对比</p>
          </div>
        )}
      </main>
    </div>
  )
}
