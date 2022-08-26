import * as Styled from './Styles'

const LoginInfo = ({ nameLogged, handleLogout }) => (
  <div>
    {nameLogged} logged in{' '}
    <Styled.Button onClick={handleLogout}>logout</Styled.Button>
  </div>
)

export default LoginInfo
