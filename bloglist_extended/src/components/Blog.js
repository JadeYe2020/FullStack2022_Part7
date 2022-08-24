import { useState } from 'react'

const Blog = ({ blog, addLike, deletePost, username }) => {
  const [ detailsDisplayed, setDetailsDisplayed ] = useState(false)

  let buttonLabel = detailsDisplayed ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setDetailsDisplayed(!detailsDisplayed)

  return (
    <div className='blogItem' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='toggle-button' onClick={toggleVisibility}>{buttonLabel}</button>
      { detailsDisplayed ?
        <div>
          <div id='url'>{blog.url}</div>
          <div id='likes'>
            likes {blog.likes}
            <button id='like' onClick={addLike}>like</button>
          </div>
          {blog.user ?
            <div>
              <div>{blog.user.name}</div>
              {
                username === blog.user.username ?
                  <button id='delete-button' onClick={deletePost}>remove</button>
                  : <div></div>
              }
            </div>
            : <div></div>}
        </div>
        : <div></div>
      }
    </div>
  )
}

export default Blog