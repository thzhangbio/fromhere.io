import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, Edit3, Share2, Palette, Monitor, Smartphone, Tablet } from 'lucide-react'
import { useWebsite } from '../contexts/WebsiteContext'
import WebsiteTemplate from '../components/WebsiteTemplate'

const PreviewPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentWebsite, setCurrentWebsite, saveWebsite } = useWebsite()
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [selectedTheme, setSelectedTheme] = useState('blue')
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  if (!currentWebsite) {
    navigate('/create')
    return null
  }

  const templates = [
    { id: 'modern', name: '现代简约', description: '简洁现代的设计风格' },
    { id: 'creative', name: '创意设计', description: '富有创意的视觉效果' },
    { id: 'professional', name: '商务专业', description: '专业商务风格' },
    { id: 'minimal', name: '极简主义', description: '极简设计理念' }
  ]

  const themes = [
    { id: 'blue', name: '海洋蓝', color: 'bg-blue-500' },
    { id: 'purple', name: '紫罗兰', color: 'bg-purple-500' },
    { id: 'green', name: '森林绿', color: 'bg-green-500' },
    { id: 'orange', name: '活力橙', color: 'bg-orange-500' },
    { id: 'pink', name: '樱花粉', color: 'bg-pink-500' }
  ]

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    if (currentWebsite) {
      setCurrentWebsite({
        ...currentWebsite,
        template: templateId
      })
    }
  }

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    if (currentWebsite) {
      setCurrentWebsite({
        ...currentWebsite,
        theme: themeId
      })
    }
  }

  const handleSaveAndShare = () => {
    if (currentWebsite) {
      const updatedWebsite = {
        ...currentWebsite,
        template: selectedTemplate,
        theme: selectedTheme
      }
      saveWebsite(updatedWebsite)
      setCurrentWebsite(updatedWebsite)
      navigate('/share')
    }
  }

  const getViewModeClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'w-full'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/create')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回编辑
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'desktop' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'tablet' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'
                  }`}
                >
                  <Tablet className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'mobile' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => navigate('/create')}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                编辑内容
              </button>
              
              <button
                onClick={handleSaveAndShare}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                保存并分享
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
          <div className="p-6">
            {/* Template Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                选择模板
              </h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                选择主题色
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTheme === theme.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 ${theme.color} rounded-full mx-auto mb-2`}></div>
                    <div className="text-sm font-medium text-gray-900">{theme.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-6">
          <div className={`transition-all duration-300 ${getViewModeClass()}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <WebsiteTemplate
                personalInfo={currentWebsite.personalInfo}
                template={selectedTemplate}
                theme={selectedTheme}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage