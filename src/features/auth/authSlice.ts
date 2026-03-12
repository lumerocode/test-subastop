import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_user');
  }
  return null;
};

const initialState: AuthState = {
  isAuthenticated: !!getInitialUser(), 
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('auth_user', action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth_user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;