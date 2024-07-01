import { useContext } from 'react'
import {
  NotificationContextType,
  NotificationContext,
} from '../contexts/NotificationContext'

const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}

export default useNotification
