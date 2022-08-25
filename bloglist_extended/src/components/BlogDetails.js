import React from 'react'

const BlogDetails = ({ blog, addLike }) => {
  const Comments = () => {
    return (
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    )
  }

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
      {blog.user ? <p>added by {blog.user.name}</p> : null}
      {blog.comments.length ? <Comments /> : null}
    </div>
  )
}

export default BlogDetails
