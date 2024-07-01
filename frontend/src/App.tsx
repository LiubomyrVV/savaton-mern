import { Outlet } from 'react-router-dom'
import Header from './widgets/header/Header'
import { toast } from 'react-toastify'
import { NotificationProvider } from './contexts/NotificationContext'

function App() {
  const notify = () => toast('Wow so easy !')

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
