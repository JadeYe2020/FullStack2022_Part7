import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import * as Styled from './Styles'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

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
      <div style={showWhenVisible}>
        {props.children}
        <Styled.Button onClick={toggleVisibility}>
          {props.buttonLabelToHide}
        </Styled.Button>
      </div>
      <div style={hideWhenVisible}>
        <Styled.Button onClick={toggleVisibility}>
          {props.buttonLabelToShow}
        </Styled.Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabelToHide: PropTypes.string.isRequired,
  buttonLabelToShow: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
