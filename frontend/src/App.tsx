import { Outlet } from 'react-router-dom'
import Header from './widgets/header/Header'

function App() {
  return (
    <>
      <Header />
      <div id="global-container">
        <Outlet />
      </div>
    </>
  )
}

export default App
