import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import 'reset-css'

import { RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import ProductPage from './pages/ProductPage/ProductPage.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { StoreProvider } from './store/Store.tsx'
import { router } from './router.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
)
