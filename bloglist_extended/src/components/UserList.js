import React from 'react'
import * as Styled from './Styles'

const UserList = ({ users }) => {
  return (
    <Styled.Page>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blog created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Styled.RegularLink to={`/users/${u.id}`}>
                  {u.name}
                </Styled.RegularLink>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Styled.Page>
  )
}

export default UserList
