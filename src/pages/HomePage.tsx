import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, Zap, Share2, Edit3, Users, Star } from 'lucide-react'
import { useWebsite } from '../contexts/WebsiteContext'

const HomePage: React.FC = () => {
  const { savedWebsites } = useWebsite()

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary-500" />,
      title: '快速生成',
      description: '几分钟内创建专业的个人网站，无需编程知识'
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-500" />,
      title: '响应式设计',
      description: '自动适配所有设备，确保完美的用户体验'
    },
    {
      icon: <Share2 className="w-8 h-8 text-primary-500" />,
      title: '一键分享',
      description: '生成专属链接和二维码，轻松分享到社交媒体'
    },
    {
      icon: <Edit3 className="w-8 h-8 text-primary-500" />,
      title: '随时编辑',
      description: '支持实时编辑和多版本管理，保持内容更新'
    }
  ]

  const templates = [
    {
      name: '简约商务',
      description: '适合商务人士和专业人员',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-slate-600 to-slate-800'
    },
    {
      name: '创意设计',
      description: '适合设计师和创意工作者',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: '技术极客',
      description: '适合程序员和技术专家',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      name: '艺术文化',
      description: '适合艺术家和文化工作者',
      image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-amber-600 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold font-display text-gray-900">FromHere.io</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">功能特色</a>
              <a href="#templates" className="text-gray-600 hover:text-primary-600 transition-colors">模板展示</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">价格方案</a>
              {savedWebsites.length > 0 && (
                <Link to="/edit" className="text-gray-600 hover:text-primary-600 transition-colors">我的网站</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-gray-900 mb-6 animate-fade-in">
              创建你的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                专属网站
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              无需编程知识，几分钟内生成专业的个人网站。展示你的才华，分享你的故事，连接更广阔的世界。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link
                to="/create"
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl btn-hover"
              >
                开始创建网站
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-200 btn-hover">
                查看示例
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-60 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-200 rounded-full opacity-60 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-60 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
              为什么选择 FromHere.io？
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们提供最简单、最专业的个人网站创建体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 card-hover"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
              精美模板，任你选择
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              多种专业设计模板，智能匹配你的个人风格
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${template.color} opacity-80`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm opacity-90">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-lg">用户信赖</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600 text-lg">网站创建</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600 text-lg">正常运行时间</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            准备好创建你的专属网站了吗？
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            加入数万用户的行列，开始展示你的独特魅力
          </p>
          <Link
            to="/create"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl btn-hover"
          >
            <Zap className="w-5 h-5 mr-2" />
            立即开始创建
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-8 h-8 text-primary-400" />
                <span className="text-2xl font-bold font-display">FromHere.io</span>
              </div>
              <p className="text-gray-400 mb-4">
                让每个人都能拥有属于自己的专业网站，展示个人魅力，连接无限可能。
              </p>
              <div className="flex space-x-4">
                <Users className="w-5 h-5 text-gray-400" />
                <Share2 className="w-5 h-5 text-gray-400" />
                <Star className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">产品</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">模板库</a></li>
                <li><a href="#" className="hover:text-white transition-colors">功能介绍</a></li>
                <li><a href="#" className="hover:text-white transition-colors">价格方案</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">支持</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">用户反馈</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FromHere.io. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage