const LoginInfo = ({ nameLogged, handleLogout }) => (
  <div>
    {nameLogged} logged in <button onClick={handleLogout}>logout</button>
  </div>
)

export default LoginInfo
