import { createSlice } from "@reduxjs/toolkit";
import {
  fetchprofile,
  forgetPassword,
  login,
  logout,
  Oauth,
  resendEmail,
  resetPassword,
  signup,
  verifyemail,
} from "./authThunks";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    authLoading: false,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.authLoading = true;
    };

    const setError = (state) => {
      state.authLoading = false;
    };

    const setUserAuth = (state, action) => {
      state.authLoading = false;
      state.user = action.payload?.user;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    };

    builder
      .addCase(login.pending, setLoading)
      .addCase(login.fulfilled, setUserAuth)
      .addCase(login.rejected, setError)
      .addCase(signup.pending, setLoading)
      .addCase(signup.fulfilled, setUserAuth)
      .addCase(signup.rejected, setError)
      .addCase(Oauth.pending, (state) => {
        state.authLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(Oauth.fulfilled, setUserAuth)
      .addCase(Oauth.rejected, setError)
      .addCase(verifyemail.pending, setLoading)
      .addCase(verifyemail.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload;
      })
      .addCase(verifyemail.rejected, setError)

      .addCase(fetchprofile.pending, (state) => {
        state.authLoading = true;
        state.user = null;
      })
      .addCase(fetchprofile.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchprofile.rejected, (state) => {
        state.authLoading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated");
      })
      .addCase(forgetPassword.pending, setLoading)
      .addCase(forgetPassword.fulfilled, setError)
      .addCase(forgetPassword.rejected, setError)
      .addCase(resetPassword.pending, setLoading)
      .addCase(resetPassword.fulfilled, setError)
      .addCase(resetPassword.rejected, setError)
      .addCase(resendEmail.pending, setLoading)
      .addCase(resendEmail.fulfilled, setError)
      .addCase(resendEmail.rejected, setError);
  },
});

export default authSlice.reducer;
