import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Lock, Eye } from 'lucide-react'
import { useWebsite } from '../contexts/WebsiteContext'
import WebsiteTemplate from '../components/WebsiteTemplate'

const PublicWebsite: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { savedWebsites, updateWebsite } = useWebsite()
  const [website, setWebsite] = useState<any>(null)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      const foundWebsite = savedWebsites.find(w => w.id === id)
      if (foundWebsite) {
        setWebsite(foundWebsite)
        // 增加访问量
        updateWebsite(id, { views: foundWebsite.views + 1 })
        
        // 如果是公开网站，直接显示
        if (foundWebsite.isPublic) {
          setIsAuthenticated(true)
        }
      }
    }
  }, [id, savedWebsites])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (website && password === website.password) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('密码错误，请重试')
    }
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">网站不存在</h1>
          <p className="text-gray-600">您访问的网站可能已被删除或链接有误</p>
        </div>
      </div>
    )
  }

  if (!website.isPublic && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">网站受密码保护</h1>
            <p className="text-gray-600">请输入密码访问 {website.personalInfo.name} 的个人网站</p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">访问密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="请输入密码"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              访问网站
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* 访问统计提示 */}
      <div className="bg-primary-600 text-white text-center py-2 text-sm">
        <div className="flex items-center justify-center">
          <Eye className="w-4 h-4 mr-2" />
          此网站已被访问 {website.views} 次
        </div>
      </div>

      <WebsiteTemplate
        personalInfo={website.personalInfo}
        template={website.template}
        theme={website.theme}
      />
    </div>
  )
}

export default PublicWebsite