import React from 'react'
import IsAuthProvider from './IsAuthContext'
import NotificationProvider from './NotificationContext'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
    <IsAuthProvider>
        <NotificationProvider>
        {children}
        </NotificationProvider>
    </IsAuthProvider>
    </>
  )
}

export default AppProvider