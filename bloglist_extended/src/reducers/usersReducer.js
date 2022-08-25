import { createSlice } from '@reduxjs/toolkit'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = allUsersSlice.actions
export default allUsersSlice.reducer
