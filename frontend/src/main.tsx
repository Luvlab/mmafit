import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#161616',
            color: '#fff',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            fontSize: '0.9rem',
          },
          success: { iconTheme: { primary: '#e8202f', secondary: '#fff' } },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
