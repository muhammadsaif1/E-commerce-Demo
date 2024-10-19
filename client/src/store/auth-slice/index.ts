import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  isAuthenticated: true,
  isLoading: false,
  user: null,
};

interface UserPayload {
  userName?: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData: UserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Registration failed");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData: UserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Login failed");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache,must-revalidate,proxy-revalidate",
          },
        }
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Registration failed");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Login failed");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload.success ? null : action.payload.user;
        state.isAuthenticated = !action.payload.success ? false : true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload.success ? null : action.payload.user;
        state.isAuthenticated = !action.payload.success ? false : true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
