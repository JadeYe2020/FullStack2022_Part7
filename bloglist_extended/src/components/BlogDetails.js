import { useState } from 'react'
import * as Styled from './Styles'

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
        <Styled.Button id="like" onClick={() => addLike(blog.id)}>
          like
        </Styled.Button>
      </p>
      {blog.user ? <p>added by {blog.user.name}</p> : null}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input type="text" value={comment} onChange={onTextChange} />
        <Styled.Button type="submit">add comment</Styled.Button>
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
