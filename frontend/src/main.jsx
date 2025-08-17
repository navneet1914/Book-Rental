import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { BooksProvider } from './BookContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <BooksProvider>
      <App />
    </BooksProvider>
    </BrowserRouter>
  </StrictMode>,
)
