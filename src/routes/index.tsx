import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">欢迎来到我们的网站</h1>
      <p className="text-lg mb-4">
        这是一个使用 TanStack Router 构建的现代 React 应用程序。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">特色功能</h2>
          <ul className="list-disc list-inside">
            <li>类型安全的路由</li>
            <li>现代化的用户界面</li>
            <li>响应式设计</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">快速开始</h2>
          <p>浏览我们的产品页面或了解更多关于我们的信息。</p>
        </div>
      </div>
    </div>
  )
}