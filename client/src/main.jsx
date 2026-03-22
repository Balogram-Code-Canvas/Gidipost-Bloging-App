import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { initGA } from './analytics.js'
import 'quill/dist/quill.snow.css'

// Initialize Google Analytics
initGA()

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </HelmetProvider>
)