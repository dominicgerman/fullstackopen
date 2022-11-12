import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }
  if (message.includes('Error')) {
    return <div className="error">{message}</div>
  }
  return <div className="success">{message}</div>
}

export default Notification
