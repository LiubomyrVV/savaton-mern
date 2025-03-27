import { toast } from 'react-toastify'
type NotifyTypes = 'error' | 'success' | 'warning' | 'info'

const config = { autoClose: 1000, hideProgressBar: false }

export const CustomNotify = (message: string, type: NotifyTypes, delay?: number, url?: string) => {
  const renderMessage = url ? (
    <>
      <a href={url}>
        {message}
      </a>
    </>
  ) : (
    message
  )
  toast(renderMessage, {
    ...config,
    autoClose: delay, 
    type,
  })
}
