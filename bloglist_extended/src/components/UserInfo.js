const UserInfo = ({ nameLogged, handleLogout }) => (
  <p>
    {nameLogged} logged in
    <button onClick={handleLogout}>logout</button>
  </p>
)

export default UserInfo