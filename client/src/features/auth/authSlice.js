import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
};

// Register user
export const registerUserAsync = createAsyncThunk(
  "auth/registerUserAsync",
  async (user, thunkAPI) => {
    try {
      return await registerUser(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (user, thunkAPI) => {
    try {
      return await loginUser(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUserAsync",
  async () => {
    await logoutUser();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerUserAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isSuccess = true;
    },
    [registerUserAsync.rejected]: (state, action) => {
      state.isError = true;
    },
    [loginUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUserAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isSuccess = true;
    },
    [loginUserAsync.rejected]: (state, action) => {
      state.isError = true;
    },
    [logoutUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [logoutUserAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isSuccess = true;
    },
    [logoutUserAsync.rejected]: (state, action) => {
      state.isError = true;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default authSlice.reducer;