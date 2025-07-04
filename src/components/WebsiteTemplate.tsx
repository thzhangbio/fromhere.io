import React from 'react'
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from 'lucide-react'
import { PersonalInfo } from '../contexts/WebsiteContext'

interface WebsiteTemplateProps {
  personalInfo: PersonalInfo
  template: string
  theme: string
}

const WebsiteTemplate: React.FC<WebsiteTemplateProps> = ({ personalInfo, template, theme }) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      blue: {
        primary: 'bg-blue-600',
        primaryLight: 'bg-blue-50',
        primaryText: 'text-blue-600',
        gradient: 'from-blue-600 to-blue-800'
      },
      purple: {
        primary: 'bg-purple-600',
        primaryLight: 'bg-purple-50',
        primaryText: 'text-purple-600',
        gradient: 'from-purple-600 to-purple-800'
      },
      green: {
        primary: 'bg-green-600',
        primaryLight: 'bg-green-50',
        primaryText: 'text-green-600',
        gradient: 'from-green-600 to-green-800'
      },
      orange: {
        primary: 'bg-orange-600',
        primaryLight: 'bg-orange-50',
        primaryText: 'text-orange-600',
        gradient: 'from-orange-600 to-orange-800'
      },
      pink: {
        primary: 'bg-pink-600',
        primaryLight: 'bg-pink-50',
        primaryText: 'text-pink-600',
        gradient: 'from-pink-600 to-pink-800'
      }
    }
    return themes[theme as keyof typeof themes] || themes.blue
  }

  const colors = getThemeColors(theme)

  const getSocialIcon = (platform: string) => {
    const icons = {
      linkedin: <Linkedin className="w-5 h-5" />,
      github: <Github className="w-5 h-5" />,
      twitter: <Twitter className="w-5 h-5" />,
      website: <Globe className="w-5 h-5" />
    }
    return icons[platform as keyof typeof icons] || <Globe className="w-5 h-5" />
  }

  if (template === 'modern') {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className={`relative py-20 bg-gradient-to-br ${colors.gradient} text-white overflow-hidden`}>
          {personalInfo.backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${personalInfo.backgroundImage})` }}
            />
          )}
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {personalInfo.avatar && (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
              />
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{personalInfo.name}</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">{personalInfo.profession}</p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {personalInfo.location}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        {personalInfo.bio && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className={`text-3xl font-bold ${colors.primaryText} mb-8 text-center`}>关于我</h2>
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: personalInfo.bio }}
              />
            </div>
          </section>
        )}

        {/* Skills Section */}
        {personalInfo.skills && personalInfo.skills.length > 0 && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className={`text-3xl font-bold ${colors.primaryText} mb-8 text-center`}>技能专长</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {personalInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 ${colors.primaryLight} ${colors.primaryText} rounded-full font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {personalInfo.projects && personalInfo.projects.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className={`text-3xl font-bold ${colors.primaryText} mb-12 text-center`}>项目作品</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {personalInfo.projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center ${colors.primaryText} hover:underline`}
                        >
                          查看项目 <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className={`py-16 bg-gradient-to-r ${colors.gradient} text-white`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">联系我</h2>
            
            {/* Social Links */}
            {personalInfo.socialLinks && Object.keys(personalInfo.socialLinks).length > 0 && (
              <div className="flex justify-center space-x-6 mb-8">
                {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                  if (!url) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      {getSocialIcon(platform)}
                    </a>
                  )
                })}
              </div>
            )}
            
            <p className="text-lg opacity-90">
              让我们一起创造精彩的项目！
            </p>
          </div>
        </section>
      </div>
    )
  }

  // 其他模板可以在这里添加
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{personalInfo.name}</h1>
        <p className="text-xl text-gray-600">{personalInfo.profession}</p>
      </div>
    </div>
  )
}

export default WebsiteTemplate