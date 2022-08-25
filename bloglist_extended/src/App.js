import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import Notification from './components/Notification'
import UserList from './components/UserList'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

import { setMessage, setMsgStyle } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUsername, setPassword, setLoggedIn } from './reducers/loginReducer'
import { setUsers } from './reducers/usersReducer'
import BlogList from './components/BlogList'
import UserDetails from './components/UserDetails'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const loginData = useSelector((state) => state.login)
  const users = useSelector((state) => state.allUsers)

  const sortBlogs = (a, b) => {
    if (!a.likes && b.likes) {
      return 1
    } else if (a.likes && !b.likes) {
      return -1
    } else if (a.likes && b.likes) {
      return b.likes - a.likes
    } else {
      return 0
    }
  }

  useEffect(() => {
    const getAll = async () => {
      const allBlogs = await blogService.getAll()
      const blogsSorted = allBlogs.sort(sortBlogs)
      dispatch(setBlogs(blogsSorted))
      // get users data as well
      const allUsers = await userService.getUsers()
      dispatch(setUsers(allUsers))
    }
    getAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedIn(user))
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
      const username = loginData.username
      const password = loginData.password
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setLoggedIn(user))
      // reset login form
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      showNotification('wrong username or password', errorStyle)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setLoggedIn(null))
  }

  const createNewFromRef = useRef()

  const addNew = async (newBlogObject) => {
    createNewFromRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(newBlogObject)
      dispatch(setBlogs(blogs.concat(newBlog).sort(sortBlogs)))

      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        successfulStyle
      )
    } catch (exception) {
      showNotification('error while creating new blog post', errorStyle)
    }
  }

  const addLike = async (id) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id)
      // to make sure the property likes exist
      const updatedObject = {
        ...blogToUpdate,
        likes: blogToUpdate.likes ? blogToUpdate.likes + 1 : 1,
      }

      const updatedBlog = await blogService.update(id, updatedObject)
      dispatch(
        setBlogs(
          blogs
            .map((blog) => (blog.id !== id ? blog : updatedBlog))
            .sort(sortBlogs)
        )
      )
    } catch (exception) {
      showNotification('error while liking a post', errorStyle)
    }
  }

  const deletePost = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)
    const confirmDelete = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )

    if (confirmDelete) {
      try {
        const deleteResponse = await blogService.deletePost(id)
        if (deleteResponse.status === 204) {
          dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
        }
      } catch (exception) {
        showNotification('error while removing a post', errorStyle)
      }
    }
  }

  if (loginData.loggedInUser === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          message={notification.message}
          type={notification.style}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={loginData.username}
          password={loginData.password}
          onUsernameChange={({ target }) => dispatch(setUsername(target.value))}
          onPasswordChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.style} />
      <LoginInfo
        nameLogged={loginData.loggedInUser.name}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              addNew={addNew}
              addLike={addLike}
              blogs={blogs}
              userData={loginData}
              deletePost={deletePost}
              createNewFromRef={createNewFromRef}
            />
          }
        />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  )
}

export default App
