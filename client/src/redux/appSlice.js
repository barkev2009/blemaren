import { createSlice } from '@reduxjs/toolkit';


const appSlice = createSlice({
  name: 'app',
  initialState: { isAuth: false, user: {} },
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload
    },
    setUser(state, action) {
        state.user = action.payload
    }
  }
})

// Extract the action creators object and the reducer
const { reducer } = appSlice
export const { setIsAuth, setUser } = appSlice.actions
// Export the reducer, either as a default or named export
export default reducer