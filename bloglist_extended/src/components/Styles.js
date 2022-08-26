import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Page = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
  color: #1a535c;
`
export const RegularLink = styled(Link)`
  text-decoration: none;
  color: #1a535c;
  &:hover {
    color: darkblue;
  }
`
export const Button = styled.button`
  text-transform: capitalize;
  color: #f7fff7;
  background-color: #4ecdc4;
  margin: 5px;
`
