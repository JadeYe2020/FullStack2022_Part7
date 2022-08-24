const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input id='username' type='text' value={props.username}
            name='Username' onChange={props.onUsernameChange}
          />
        </div>
        <div>
          password
          <input id='password' type='password' value={props.password}
            name='Password' onChange={props.onPasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm