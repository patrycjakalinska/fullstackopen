import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div className="flex flex-col items-center py-2" style={hideWhenVisible}>
        <button className="togglable-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div
        style={showWhenVisible}
        className="flex flex-col justify-center items-center"
      >
        {props.children} <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
