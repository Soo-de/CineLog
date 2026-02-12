import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let scrollTimeout;
window.addEventListener('scroll', () => {
  document.documentElement.classList.add('is-scrolling');
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    document.documentElement.classList.remove('is-scrolling');
  }, 800);
}, { passive: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
