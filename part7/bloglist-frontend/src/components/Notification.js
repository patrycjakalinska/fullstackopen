const Notification = ({ type, message }) => {
  return <>{message && <div className={type}>{message}</div>}</>
}
export default Notification
