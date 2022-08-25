import CreateNew from '../components/CreateNew'
import Togglable from '../components/Togglable'
import Blog from '../components/Blog'

const BlogList = (props) => {
  return (
    <div>
      <Togglable
        buttonLabelToShow="new post"
        buttonLabelToHide="cancel"
        ref={props.createNewFromRef}
      >
        <h2>create new</h2>
        <CreateNew createNew={props.addNew} />
      </Togglable>
      {props.blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
