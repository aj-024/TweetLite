import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
    // Optional: update user info without logout/login
    // updateUser: (state, action) => {
    //   if (state.userData) {
    //     state.userData = { ...state.userData, ...action.payload };
    //   }
    // },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
