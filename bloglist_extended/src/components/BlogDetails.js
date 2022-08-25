import { useState } from 'react'

const BlogDetails = ({ blog, addLike, addComment }) => {
  const [comment, setComment] = useState('')

  const onTextChange = (e) => {
    setComment(e.target.value)
  }

  const handleComment = (e) => {
    e.preventDefault()

    addComment(blog.id, comment)

    setComment('')
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input type="text" value={comment} onChange={onTextChange} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
