import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Edit3, Eye, Share2, Trash2, Globe } from 'lucide-react'
import { useWebsite } from '../contexts/WebsiteContext'

const EditPage: React.FC = () => {
  const navigate = useNavigate()
  const { savedWebsites, setCurrentWebsite, deleteWebsite } = useWebsite()

  const handleEditWebsite = (website: any) => {
    setCurrentWebsite(website)
    navigate('/preview')
  }

  const handleDeleteWebsite = (id: string) => {
    if (window.confirm('确定要删除这个网站吗？此操作无法撤销。')) {
      deleteWebsite(id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </button>
            <h1 className="text-xl font-semibold text-gray-900">我的网站</h1>
            <Link
              to="/create"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              创建新网站
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedWebsites.length === 0 ? (
          <div className="text-center py-16">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">还没有创建网站</h2>
            <p className="text-gray-600 mb-8">开始创建您的第一个个人网站吧！</p>
            <Link
              to="/create"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              创建网站
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedWebsites.map((website) => (
              <div key={website.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Website Preview */}
                <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="p-4 flex items-center justify-center">
                    <div className="text-center">
                      {website.personalInfo.avatar && (
                        <img
                          src={website.personalInfo.avatar}
                          alt={website.personalInfo.name}
                          className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                        />
                      )}
                      <h3 className="font-semibold text-gray-900 text-sm">{website.personalInfo.name}</h3>
                      <p className="text-xs text-gray-600">{website.personalInfo.profession}</p>
                    </div>
                  </div>
                </div>

                {/* Website Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{website.personalInfo.name}</h3>
                      <p className="text-sm text-gray-600">{website.personalInfo.profession}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      website.isPublic 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {website.isPublic ? '公开' : '私密'}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    <p>创建时间: {website.createdAt.toLocaleDateString()}</p>
                    <p>访问量: {website.views} 次</p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditWebsite(website)}
                      className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-sm"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      编辑
                    </button>
                    
                    <Link
                      to={`/site/${website.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      预览
                    </Link>
                    
                    <button
                      onClick={() => {
                        setCurrentWebsite(website)
                        navigate('/share')
                      }}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteWebsite(website.id)}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EditPage