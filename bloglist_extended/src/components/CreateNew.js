import { useState } from 'react'
import * as Styled from './Styles'

const CreateNew = ({ createNew }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const onUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = (event) => {
    event.preventDefault()

    createNew({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <div>
        author:
        <input
          id="author-input"
          type="text"
          value={author}
          onChange={onAuthorChange}
        />
      </div>
      <div>
        url:
        <input id="url-input" type="text" value={url} onChange={onUrlChange} />
      </div>
      <Styled.Button id="submit-button" type="submit">
        create
      </Styled.Button>
    </form>
  )
}

export default CreateNew
