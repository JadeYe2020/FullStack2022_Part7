import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  password: '',
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
    setUser(state, action) {
      return { ...state, user: action.payload }
    },
  },
})

export const { setUsername, setPassword, setUser } = userSlice.actions
export default userSlice.reducer
