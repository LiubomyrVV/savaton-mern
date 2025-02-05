import { Outlet } from 'react-router-dom'
import Header from './widgets/header/Header'
import AppProvider from './contexts/AppProvider'
import { Suspense, useContext, useEffect } from 'react'
import i18n from './i18next'
import { languages } from './store/lib/constants'
import { Store } from './store'

function App() {
  const { state } = useContext(Store)
  const { preferences: { language }} = state 
  useEffect(() => {
    i18n.changeLanguage(languages[language as keyof typeof languages])
    return () => {
      console.log('Cleanup if needed');
    };
  }, [])
  return (
    <>
      <AppProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <div id="global-container">
          <Outlet />
        </div>
      </Suspense>
      </AppProvider>
    </>
  )
}

export default App
