import { aiModels, scoreLabels } from '../../../data/models'
import { ArrowLeft, Building2, DollarSign, BookOpen, Globe, Zap } from 'lucide-react'
import Link from 'next/link'

// 生成静态参数
export function generateStaticParams() {
  return aiModels.map((model) => ({
    id: model.id,
  }))
}

// 生成元数据
export function generateMetadata({ params }) {
  const model = aiModels.find(m => m.id === params.id)
  if (!model) {
    return {
      title: '模型未找到 - AI 大模型指数',
    }
  }
  return {
    title: `${model.name} - AI 大模型指数`,
    description: model.description,
  }
}

export default function ModelDetail({ params }) {
  const model = aiModels.find(m => m.id === params.id)

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">模型未找到</h1>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{model.name}</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{model.name}</h1>
              <div className="flex items-center space-x-3">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {model.company}
                </span>
                {model.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">综合评分</div>
              <div className="text-5xl font-bold text-blue-600">{model.scores.overall}</div>
              <div className="text-sm text-gray-400">/ 100</div>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 mb-6">{model.description}</p>
          
          <a
            href={model.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span>访问官网</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">公司背景</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{model.companyInfo}</p>
            </div>

            {/* Model Specs */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">模型规格</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">参数量</div>
                  <div className="text-lg font-semibold text-gray-900">{model.params}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">训练数据</div>
                  <div className="text-lg font-semibold text-gray-900">{model.trainingData}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">上下文窗口</div>
                  <div className="text-lg font-semibold text-gray-900">{model.contextWindow}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">发布日期</div>
                  <div className="text-lg font-semibold text-gray-900">{model.releaseDate}</div>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">产品迭代</h2>
              </div>
              <div className="space-y-4">
                {model.versions.map((version, index) => (
                  <div key={version.version} className="flex items-start space-x-4">
                    <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{version.version}</span>
                        <span className="text-sm text-gray-500">{version.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{version.changes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Scores */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">能力评分</h2>
              </div>
              <div className="space-y-4">
                {Object.entries(model.scores).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">{scoreLabels[key]}</span>
                      <span className="font-semibold text-gray-900">{score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">价格信息</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">输入价格</div>
                  <div className="text-xl font-bold text-green-700">{model.pricing.input}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">输出价格</div>
                  <div className="text-xl font-bold text-green-700">{model.pricing.output}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">订阅方案</div>
                  <div className="text-lg font-semibold text-green-700">{model.pricing.subscription}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">标签</h2>
              <div className="flex flex-wrap gap-2">
                {model.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
