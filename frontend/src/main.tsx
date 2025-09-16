import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { HashRouter, Routes, Route } from 'react-router'
import Start from './components/pages/Start/Start'
import Home from './components/pages/Home/Home'

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
