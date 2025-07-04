import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Share2, QrCode, Eye, Lock, Globe, Download } from 'lucide-react'
import QRCode from 'qrcode'
import { useWebsite } from '../contexts/WebsiteContext'

const SharePage: React.FC = () => {
  const navigate = useNavigate()
  const { currentWebsite, updateWebsite } = useWebsite()
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [password, setPassword] = useState('')

  if (!currentWebsite) {
    navigate('/')
    return null
  }

  const websiteUrl = `${window.location.origin}/site/${currentWebsite.id}`

  useEffect(() => {
    generateQRCode()
  }, [websiteUrl])

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(websiteUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      })
      setQrCodeUrl(url)
    } catch (error) {
      console.error('生成二维码失败:', error)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(websiteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  const shareToSocial = (platform: string) => {
    const text = `查看我的个人网站：${currentWebsite.personalInfo.name} - ${currentWebsite.personalInfo.profession}`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(websiteUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}`,
      wechat: websiteUrl // 微信分享需要特殊处理
    }
    
    if (platform === 'wechat') {
      // 显示二维码供微信扫描
      return
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
  }

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.download = `${currentWebsite.personalInfo.name}-qrcode.png`
      link.href = qrCodeUrl
      link.click()
    }
  }

  const handlePrivacyChange = (newIsPublic: boolean) => {
    setIsPublic(newIsPublic)
    updateWebsite(currentWebsite.id, { 
      isPublic: newIsPublic,
      password: newIsPublic ? undefined : password
    })
  }

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
    if (!isPublic) {
      updateWebsite(currentWebsite.id, { password: newPassword })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/preview')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回预览
            </button>
            <h1 className="text-xl font-semibold text-gray-900">分享网站</h1>
            <button
              onClick={() => navigate(`/site/${currentWebsite.id}`)}
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Eye className="w-5 h-5 mr-2" />
              查看网站
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 分享链接 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Share2 className="w-6 h-6 mr-2 text-primary-600" />
              分享链接
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">网站链接</label>
                <div className="flex">
                  <input
                    type="text"
                    value={websiteUrl}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                {copied && (
                  <p className="text-green-600 text-sm mt-2">链接已复制到剪贴板！</p>
                )}
              </div>

              {/* 隐私设置 */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">隐私设置</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      checked={isPublic}
                      onChange={() => handlePrivacyChange(true)}
                      className="mr-3 text-primary-600"
                    />
                    <div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-green-600" />
                        <span className="font-medium">公开访问</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">任何人都可以访问您的网站</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="privacy"
                      checked={!isPublic}
                      onChange={() => handlePrivacyChange(false)}
                      className="mr-3 text-primary-600"
                    />
                    <div>
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-orange-600" />
                        <span className="font-medium">密码保护</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">需要密码才能访问</p>
                    </div>
                  </label>
                </div>

                {!isPublic && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">访问密码</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="设置访问密码"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 二维码分享 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <QrCode className="w-6 h-6 mr-2 text-primary-600" />
              二维码分享
            </h2>
            
            <div className="text-center">
              {qrCodeUrl && (
                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg mb-4">
                  <img src={qrCodeUrl} alt="网站二维码" className="w-48 h-48" />
                </div>
              )}
              
              <p className="text-gray-600 mb-4">扫描二维码访问网站</p>
              
              <button
                onClick={downloadQRCode}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center mx-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                下载二维码
              </button>
            </div>
          </div>

          {/* 社交媒体分享 */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">社交媒体分享</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => shareToSocial('twitter')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-sm font-medium">Twitter</span>
              </button>
              
              <button
                onClick={() => shareToSocial('facebook')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">f</span>
                </div>
                <span className="text-sm font-medium">Facebook</span>
              </button>
              
              <button
                onClick={() => shareToSocial('linkedin')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">in</span>
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
              
              <button
                onClick={() => shareToSocial('wechat')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold">微</span>
                </div>
                <span className="text-sm font-medium">微信</span>
              </button>
            </div>
          </div>

          {/* 网站统计 */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">网站统计</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{currentWebsite.views}</div>
                <div className="text-gray-600">总访问量</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.floor((Date.now() - currentWebsite.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-gray-600">在线天数</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {currentWebsite.updatedAt.toLocaleDateString()}
                </div>
                <div className="text-gray-600">最后更新</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharePage