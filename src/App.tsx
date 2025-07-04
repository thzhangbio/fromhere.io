import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { WebsiteProvider } from './contexts/WebsiteContext'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import PreviewPage from './pages/PreviewPage'
import SharePage from './pages/SharePage'
import EditPage from './pages/EditPage'
import PublicWebsite from './pages/PublicWebsite'

function App() {
  return (
    <WebsiteProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/site/:id" element={<PublicWebsite />} />
        </Routes>
      </div>
    </WebsiteProvider>
  )
}

export default App