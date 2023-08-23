import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  user: {
    isLogged:boolean,
    username:string,
  }
}

const initialState: CounterState = {
  user:{
    isLogged:false,
    username:'',
  }
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    successLogin: (state,action:PayloadAction<{isLogged:boolean,username:string}>) => {
      state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { successLogin} = loginSlice.actions

export default loginSlice.reducer