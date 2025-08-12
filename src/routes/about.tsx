import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">关于我们</h1>
      <div className="max-w-4xl">
        <p className="text-lg mb-4">
          我们是一家致力于创新技术解决方案的公司，专注于为客户提供高质量的产品和服务。
        </p>
        
        <h2 className="text-2xl font-semibold mb-3">我们的使命</h2>
        <p className="mb-4">
          通过先进的技术和创新的思维，为客户创造价值，推动行业发展。
        </p>

        <h2 className="text-2xl font-semibold mb-3">团队介绍</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold">技术团队</h3>
            <p className="text-sm text-gray-600">经验丰富的开发工程师</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold">设计团队</h3>
            <p className="text-sm text-gray-600">创意十足的UI/UX设计师</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold">产品团队</h3>
            <p className="text-sm text-gray-600">专业的产品经理</p>
          </div>
        </div>
      </div>
    </div>
  )
}