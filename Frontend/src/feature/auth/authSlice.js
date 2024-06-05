import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config/env.config";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredential) => {
    const request = await axios.post(
      `${config.VITE_BACKEND}/login`,
      userCredential
    );

    const response = request.data.user;
    // localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${config.VITE_BACKEND}/logout`,
        {},
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  User: {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    image: [],
  },
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    fetchImageRequest: (state) => {
      (state.User.loading = true), (state.User.error = null);
    },
    fetchImageSuccess: (state, action) => {
      state.User.image = action.payload;
      state.User.error = null;
      state.User.loading = false;
    },
    fetchImageFailure: (state, action) => {
      state.User.error = action.payload;
      state.User.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.User.user = null;
        state.User.isAuthenticated = false;
        state.User.loading = true;
        state.User.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.User.loading = false;
        state.User.error = null;
        state.User.isAuthenticated = true;
        state.User.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.User.loading = false;
        state.User.error = action.payload;
        state.User.isAuthenticated = false;
        console.log(action.error);
        if (action.error.message === "Request failed with status code 400") {
          state.User.error = "Access denied! Invalid credentials";
        } else if (
          action.error.message === "Request failed with status code 404"
        ) {
          state.User.error = "Email is not registered";
        } else if (action.error.message === "Network Error") {
          state.User.error = "Somethings wrong with the server";
        } else {
          state.User.user = action.error.message;
        }
      })
      .addCase(logoutUser.pending, (state) => {
        // Set loading state to indicate logout in progress (optional)
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("Logout ho gya");
        state.User.isAuthenticated = false;
        state.User.user = null;
        state.loading = false;
        // Clear error state (optional)
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Handle logout errors (optional)
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchImageFailure, fetchImageRequest, fetchImageSuccess } =
  userSlice.actions;

export default userSlice.reducer;
