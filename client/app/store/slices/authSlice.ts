import apiClient from "@/api/apiClinet";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const getMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      return rejectWithValue("No token");
    }

    try {
      const { data } = await apiClient.get("/auth/me");

      return {
        token,
        user: data.data,
      };
    } catch (error: any) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }

      return rejectWithValue(error.response?.data?.message || "Unauthorized");
    }
  },
);

export interface User {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
  region: string;
  referral_code: string;
  referred_by: string | null;
  total_referrals: number;
  role: "user" | "admin";
  level: "hustler" | "leader";
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
}

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

const initialState: AuthState = {
  token: getStoredToken(),
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
        user: User;
      }>,
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    setInitialized(state) {
      state.initialized = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = true;

        state.token = action.payload.token;
        state.user = action.payload.user;
      })

      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = false;

        state.token = null;
        state.user = null;
      });
  },
});

export const { loginSuccess, logout, setInitialized } = authSlice.actions;

export default authSlice.reducer;
