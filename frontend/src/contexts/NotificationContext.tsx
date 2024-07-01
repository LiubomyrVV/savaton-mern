import React, { createContext } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { CustomNotify as notify } from '../components/common/CustomNotify'

export type NotificationContextType = {
  notify: (
    message: string,
    type: 'error' | 'success' | 'warning' | 'info'
  ) => void
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer stacked />
    </NotificationContext.Provider>
  )
}
