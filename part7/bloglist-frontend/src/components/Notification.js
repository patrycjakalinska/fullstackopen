//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  //const message = useSelector((state) => state.notification)


  return (
    notification && (
      <div className="flex mb-4 notification">
        <div className="m-auto">
          <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
            <div className="flex flex-row">
              <div className="ml-2 mr-6">
                <span className="font-semibold">{notification}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)
