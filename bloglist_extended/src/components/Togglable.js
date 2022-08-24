import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(
  (props, refs) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility
      }
    })

    return (
      <div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>{props.buttonLabelToHide}</button>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabelToShow}</button>
        </div>
      </div>
    )
  }
)

Togglable.propTypes = {
  buttonLabelToHide: PropTypes.string.isRequired,
  buttonLabelToShow: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable