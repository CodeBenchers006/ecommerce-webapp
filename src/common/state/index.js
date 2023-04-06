import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  cartItems: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccesssss(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action) {
      state.isAuthenticated = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    handleAddCart(state, action) {
      state.cartItems.push(action.payload);
    },
    handleremoveFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.cart_id !== id);
      
    },
    resetAuthState(state) {
      return initialState;
    }
  },
});

export const {
  loginSuccesssss,
  loginFail,
  logout,
  handleAddCart,
  handleremoveFromCart,
  resetAuthState
} = authSlice.actions;

export default authSlice.reducer;
