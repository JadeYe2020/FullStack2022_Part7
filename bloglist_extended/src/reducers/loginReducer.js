import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  password: '',
  loggedInUser: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
    setLoggedIn(state, action) {
      return { ...state, loggedInUser: action.payload }
    },
  },
})

export const { setUsername, setPassword, setLoggedIn } = loginSlice.actions
export default loginSlice.reducer
