import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChatFeedProvider } from "./contexts/ChatFeedContext.jsx";
import { AuthProvider } from './contexts/authContext.jsx';

import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <ChatFeedProvider>

        <App />

      </ChatFeedProvider>
    </AuthProvider>

  </StrictMode>,
)
