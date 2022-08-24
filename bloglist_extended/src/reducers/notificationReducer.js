import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  style: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return { ...state, message: action.payload }
    },
    setMsgStyle(state, action) {
      return { ...state, style: action.payload }
    }
  }
})

export const { setMessage, setMsgStyle } = notificationSlice.actions
export default notificationSlice.reducer