import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('感谢您的留言！我们会尽快回复您。')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">联系我们</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">联系信息</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">地址</h3>
              <p className="text-gray-600">北京市朝阳区科技园区123号</p>
            </div>
            <div>
              <h3 className="font-semibold">电话</h3>
              <p className="text-gray-600">+86 138-0000-0000</p>
            </div>
            <div>
              <h3 className="font-semibold">邮箱</h3>
              <p className="text-gray-600">contact@example.com</p>
            </div>
            <div>
              <h3 className="font-semibold">工作时间</h3>
              <p className="text-gray-600">周一至周五 9:00-18:00</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">发送消息</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                消息
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}