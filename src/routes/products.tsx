import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products')({
  component: Products,
})

function Products() {
  const products = [
    {
      id: 1,
      name: 'Web应用开发',
      description: '现代化的响应式Web应用程序开发服务',
      price: '¥10,000起',
      features: ['React/Vue框架', '响应式设计', 'API集成']
    },
    {
      id: 2,
      name: '移动应用开发',
      description: '跨平台移动应用开发解决方案',
      price: '¥15,000起',
      features: ['React Native', 'iOS/Android', '原生性能']
    },
    {
      id: 3,
      name: '系统集成',
      description: '企业级系统集成和数据迁移服务',
      price: '¥20,000起',
      features: ['数据迁移', '系统对接', '性能优化']
    }
  ]

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">我们的产品</h1>
      <p className="text-lg mb-6">
        为您提供全方位的技术解决方案，满足不同业务需求。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-2xl font-bold text-blue-600 mb-4">{product.price}</div>
            <ul className="list-disc list-inside text-sm">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              了解更多
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}