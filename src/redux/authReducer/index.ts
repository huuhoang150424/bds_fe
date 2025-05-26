
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAuth } from '../action/auth'

interface User {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  roles: string;
  phone: string;
  balance:number;
  score:number;
  isLock: boolean;
  is2FAEnabled: boolean;
  emailVerified: boolean ;
  isProfessional: boolean;
  twoFactorSecret:string | null;

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
    updateVerifiedMail: (state) => {
      if (state.user) {
        state.user.emailVerified = true;
      }
    },
    updatePhoneStore: (state,action)=>{
      if (state.user) {
        state.user.phone=action.payload.phone;
      }
    },
    updateBalance: (state,action)=>{
      if (state.user) {
        state.user.balance+=action.payload.balance;
      }
    },
    updateRole: (state,action)=>{
      if (state.user) {
        state.user.roles=action.payload.roles;
      }
    },
    setAuth: (state,action)=>{
      state.token=action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated=true;
    },
    updateProfessionalStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isProfessional = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<{ message: string; data: any }>) => {
        state.loading = false;
        state.message = action.payload.message;
        if (action.payload.data.twoFactorRequired) {
          // Handle 2FA case
          state.success = false; // Prevent premature success
          state.isAuthenticated = false;
        } else {
          // Handle successful login without 2FA
          state.isAuthenticated = true;
          state.success = true;
          state.token = action.payload.data.accessToken;
          state.user = action.payload.data.user;
        }
      })
      .addCase(loginAuth.rejected, (state,action:any) => {
        console.log(action.payload)
        state.message=action.payload.message
        state.success = false;
        state.loading = false;
        state.error = true;
      });
  },
});

export const { logout,updateToken ,resetAuthState,updateAuth,updateProfessionalStatus,updateVerifiedMail,updatePhoneStore,updateRole,setAuth,updateBalance} = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectMessage = (state: { auth: AuthState }) => state.auth.message;
export const selectSuccess = (state: { auth: AuthState }) => state.auth.success;

export default authSlice.reducer;
