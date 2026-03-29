import './globals.css'

export const metadata = {
  title: 'AI 大模型指数 - 全球大模型排行榜',
  description: '全面对比全球主流 AI 大模型，包括性能评分、价格对比、产品迭代等信息，助您选择最适合的大模型',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  )
}
