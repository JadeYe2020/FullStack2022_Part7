import styled from 'styled-components'
import * as Styled from './Styles'

const BlogItem = styled.div`
  padding-top: 10px;
  padding-left: 5px;
  border: 1px solid grey;
  margin: 5px;
`

const Blog = ({ blog }) => {
  return (
    <BlogItem className="blogItem">
      <Styled.RegularLink to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Styled.RegularLink>
    </BlogItem>
  )
}

export default Blog
