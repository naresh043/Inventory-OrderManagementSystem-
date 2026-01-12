import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, updateUserRole, deleteUser } from "../../api/usersApi";

/* ================= THUNKS ================= */

// Fetch users (ONCE)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsers();
      return res?.data;
    } catch (err) {
      return rejectWithValue("Fetch users failed");
    }
  }
);

// Update role
export const editUserRole = createAsyncThunk(
  "users/editUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const res = await updateUserRole(id, role);
      return { id, role: res.data.role || role };
    } catch (err) {
      return rejectWithValue("Update role failed");
    }
  }
);

// Delete user
export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);

/* ================= SLICE ================= */

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })

      // UPDATE ROLE
      .addCase(editUserRole.fulfilled, (state, action) => {
        const user = state.list.find((u) => u.id === action.payload.id);
        if (user) {
          user.role = action.payload.role;
        }
      })

      // DELETE
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
