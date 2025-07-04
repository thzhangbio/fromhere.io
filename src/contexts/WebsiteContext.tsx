import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface PersonalInfo {
  name: string
  profession: string
  email: string
  phone: string
  location: string
  bio: string
  skills: string[]
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  projects: Array<{
    id: string
    title: string
    description: string
    image?: string
    link?: string
    technologies: string[]
  }>
  avatar?: string
  backgroundImage?: string
}

export interface WebsiteData {
  id: string
  personalInfo: PersonalInfo
  template: string
  theme: string
  isPublic: boolean
  password?: string
  createdAt: Date
  updatedAt: Date
  views: number
}

interface WebsiteContextType {
  currentWebsite: WebsiteData | null
  setCurrentWebsite: (website: WebsiteData | null) => void
  savedWebsites: WebsiteData[]
  saveWebsite: (website: WebsiteData) => void
  deleteWebsite: (id: string) => void
  updateWebsite: (id: string, updates: Partial<WebsiteData>) => void
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined)

export const useWebsite = () => {
  const context = useContext(WebsiteContext)
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider')
  }
  return context
}

export const WebsiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteData | null>(null)
  const [savedWebsites, setSavedWebsites] = useState<WebsiteData[]>(() => {
    const saved = localStorage.getItem('savedWebsites')
    return saved ? JSON.parse(saved) : []
  })

  const saveWebsite = (website: WebsiteData) => {
    const updatedWebsites = [...savedWebsites.filter(w => w.id !== website.id), website]
    setSavedWebsites(updatedWebsites)
    localStorage.setItem('savedWebsites', JSON.stringify(updatedWebsites))
  }

  const deleteWebsite = (id: string) => {
    const updatedWebsites = savedWebsites.filter(w => w.id !== id)
    setSavedWebsites(updatedWebsites)
    localStorage.setItem('savedWebsites', JSON.stringify(updatedWebsites))
  }

  const updateWebsite = (id: string, updates: Partial<WebsiteData>) => {
    const updatedWebsites = savedWebsites.map(w => 
      w.id === id ? { ...w, ...updates, updatedAt: new Date() } : w
    )
    setSavedWebsites(updatedWebsites)
    localStorage.setItem('savedWebsites', JSON.stringify(updatedWebsites))
    
    if (currentWebsite?.id === id) {
      setCurrentWebsite({ ...currentWebsite, ...updates, updatedAt: new Date() })
    }
  }

  return (
    <WebsiteContext.Provider value={{
      currentWebsite,
      setCurrentWebsite,
      savedWebsites,
      saveWebsite,
      deleteWebsite,
      updateWebsite
    }}>
      {children}
    </WebsiteContext.Provider>
  )
}