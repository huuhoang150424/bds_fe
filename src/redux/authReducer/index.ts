import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAuth } from '../action/auth'

interface User {
  id: number;
  fullname: string;
  email: string;
  avatar: string
}

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User | null;
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  user: null,
  loading: false,
  error: false,
  message: '',
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState
    },
    updateToken: (state,action)=>{
      state.token=action.payload.token;
    },
    resetAuthState: (state)=>{
      state.message='';
      state.loading=false;
      state.error=false;
      state.success=false;
    },
    updateAuth: (state, action:  PayloadAction<{ data: User }>) => {
      state.user = {
        ...state.user, 
        ...action.payload.data
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<{  message: string; data: any }>) => {
        state.isAuthenticated = true;
        state.success = true;
        state.loading = false;
        state.token = action.payload.data.accessToken;
        state.message = action.payload.message;
        state.user = action.payload.data.user;
      })
      .addCase(loginAuth.rejected, (state,action:any) => {
        console.log(action.payload)
        state.success = false;
        state.loading = false;
        state.error = true;
      });
  },
});

export const { logout,updateToken ,resetAuthState,updateAuth} = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectMessage = (state: { auth: AuthState }) => state.auth.message;
export const selectSuccess = (state: { auth: AuthState }) => state.auth.success;

export default authSlice.reducer;
