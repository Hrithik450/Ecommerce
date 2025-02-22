import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  fetchUserData,
  fetchUsersList,
  updateUser,
} from "./adminAuthThunks";

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    totalUsers: 0,
    adminAuthLoading: false,
    FilterPanel: false,
    EditPanel: false,
    BlockPanel: false,
    MorePanel: false,
    usersList: [],
    userData: null,
  },
  reducers: {
    toggleUserPanel: (state) => {
      state.FilterPanel = !state.FilterPanel;
    },
    toggleUserEdit: (state) => {
      state.EditPanel = !state.EditPanel;
    },
    toggleUserBlock: (state) => {
      state.BlockPanel = !state.BlockPanel;
    },
    toggleMorePanel: (state) => {
      state.MorePanel = !state.MorePanel;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.adminAuthLoading = true;
    };

    const setError = (state) => {
      state.adminAuthLoading = false;
    };

    const setAdminUsers = (state, action) => {
      state.adminAuthLoading = false;
      state.usersList = action.payload?.users;
      state.totalUsers = action.payload?.totalUsers;
    };

    builder
      .addCase(fetchUsersList.pending, setLoading)
      .addCase(fetchUsersList.fulfilled, setAdminUsers)
      .addCase(fetchUsersList.rejected, setError)
      .addCase(fetchUserData.pending, setLoading)
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.adminAuthLoading = false;
        state.userData = action.payload?.data;
      })
      .addCase(fetchUserData.rejected, setError)
      .addCase(updateUser.pending, setLoading)
      .addCase(updateUser.fulfilled, setAdminUsers)
      .addCase(updateUser.rejected, setError)
      .addCase(deleteUser.pending, setLoading)
      .addCase(deleteUser.fulfilled, setAdminUsers)
      .addCase(deleteUser.rejected, setError);
  },
});

export const {
  toggleUserPanel,
  toggleUserEdit,
  toggleUserBlock,
  toggleMorePanel,
} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
