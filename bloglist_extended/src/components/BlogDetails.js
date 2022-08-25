import React from 'react'

const BlogDetails = ({ blog, addLike }) => {
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{' '}
        <button id="like" onClick={() => addLike(blog.id)}>
          like
        </button>
      </p>
      {blog.user.name && <p>added by {blog.user.name}</p>}
    </div>
  )
}

export default BlogDetails
