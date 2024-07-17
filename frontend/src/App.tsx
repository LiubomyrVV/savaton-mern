import { Outlet } from 'react-router-dom'
import Header from './widgets/header/Header'
import { NotificationProvider } from './contexts/NotificationContext'

function App() {
  return (
    <>
      <NotificationProvider>
        <Header />

        <div id="global-container">
          <Outlet />
        </div>
      </NotificationProvider>
    </>
  )
}

export default App
