import { toast } from 'react-toastify'
type NotifyTypes = 'error' | 'success' | 'warning' | 'info'

const config = { autoClose: 1000, hideProgressBar: false }

export const CustomNotify = (message: string, type: NotifyTypes) => {
  toast(message, {
    ...config,
    type,
  })
}
