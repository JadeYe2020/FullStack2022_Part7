import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateNew from './components/CreateNew'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { setMessage, setMsgStyle } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const sortBlogs = (a, b) => {
    if (!a.likes && b.likes) {
      return 1
    } else if (a.likes && !b.likes) {
      return -1
    } else if (a.likes && b.likes ) {
      return (b.likes - a.likes)
    } else { return 0 }
  }

  useEffect(() => {
    const getAll = async () => {
      const blogs = await blogService.getAll()
      const blogsSorted = blogs.sort(sortBlogs)
      setBlogs( blogsSorted )
    }
    getAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // styles for notifications
  const successfulStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = { ...successfulStyle, color: 'red' }

  const showNotification = (message, style) => {
    dispatch(setMessage(message))
    dispatch(setMsgStyle(style))

    setTimeout(() => {
      dispatch(setMessage(''))
      dispatch(setMsgStyle(null))
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      // reset login form
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', errorStyle)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createNewFromRef = useRef()

  const addNew = async (newBlogObject) => {
    createNewFromRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(newBlogObject)

      setBlogs(blogs.concat(newBlog).sort(sortBlogs))

      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, successfulStyle)

    } catch (exception) {
      showNotification('error while creating new blog post', errorStyle)
    }
  }

  const addLike = async (id) => {
    try {
      const blogToUpdate = blogs.find(blog => blog.id === id)
      // to make sure the property likes exist
      const updatedObject = { ...blogToUpdate, likes: blogToUpdate.likes ? (blogToUpdate.likes + 1) : 1 }

      const updatedBlog = await blogService.update(id, updatedObject)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog).sort(sortBlogs))
    } catch (exception) {
      showNotification('error while liking a post', errorStyle)
    }
  }

  const deletePost = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    const confirmDelete = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)

    if (confirmDelete) {
      try {
        const deleteResponse = await blogService.deletePost(id)
        if (deleteResponse.status === 204) {
          setBlogs(blogs.filter(blog => blog.id !== id))
        }
      } catch (exception) {
        showNotification('error while removing a post', errorStyle)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification.message} type={notification.style} />
        <LoginForm handleLogin={handleLogin}
          username={username} password={password}
          onUsernameChange={({ target }) => setUsername(target.value)}
          onPasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.style} />
      <UserInfo
        nameLogged={user.name}
        handleLogout={handleLogout}
      />
      <Togglable
        buttonLabelToShow='new post'
        buttonLabelToHide='cancel'
        ref={createNewFromRef}>
        <h2>create new</h2>
        <CreateNew createNew={addNew} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          addLike={() => addLike(blog.id)}
          username={user.username}
          deletePost={() => deletePost(blog.id)}
        />
      )}
    </div>
  )
}

export default App