import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MusicProvider } from './hooks/context.tsx'

createRoot(document.getElementById('root')!).render(
  <MusicProvider>
    <App />
  </MusicProvider>
)
