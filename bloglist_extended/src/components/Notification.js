const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification' style={type}>
      {message}
    </div>
  )
}

export default Notification