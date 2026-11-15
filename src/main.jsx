import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'
import { applyTheme, getInitialTheme } from './theme/useTheme.js'
import './styles/app.css'

// Antes del primer render: el tema guardado se aplica sin parpadeo.
applyTheme(getInitialTheme())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
