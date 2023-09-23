import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit";
import {
  createPersonDetail,
  deletePersonDetail,
  getAllPersonDetail,
  getFilterData,
  getSearchData,
  updatePersonDetail,
} from "./personService";

const initialState = {
  persons: [],
  filtersData: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

// Create
export const createPersonDetailsAsync = createAsyncThunk(
  "person/createPersonDetailsAsync",
  async (detail, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await createPersonDetail(detail, token);
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

// Get
export const getPersonDetailsAsync = createAsyncThunk(
  "person/getPersonDetailsAsync",
  async ({ search, sort }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getAllPersonDetail({ search, sort }, token);
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

// Search
// export const getSearchDataAsync = createAsyncThunk(
//   "person/getSearchDataAsync",
//   async (value, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await getSearchData(value, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Filter
export const getFilterDataAsync = createAsyncThunk(
  "person/getFilterDataAsync",
  async ({ filter, sort }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getFilterData({ filter, sort }, token);
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

// Update
export const updatePersonDetailsAsync = createAsyncThunk(
  "person/updatePersonDetailsAsync",
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await updatePersonDetail(updateData, token);
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

// Delete
export const deletePersonDetailsAsync = createAsyncThunk(
  "person/deletePersonDetailsAsync",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await deletePersonDetail(id, token);
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

export const personSlice = createSlice({
  name: "person",
  initialState,
  extraReducers: {
    [createPersonDetailsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createPersonDetailsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.persons.push(action.payload);
      state.isSuccess = true;
    },
    [createPersonDetailsAsync.rejected]: (state, action) => {
      state.isError = true;
    },
    [getPersonDetailsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPersonDetailsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.persons = action.payload;
      state.isSuccess = true;
    },
    [getPersonDetailsAsync.rejected]: (state, action) => {
      state.isError = true;
    },
    [getFilterDataAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getFilterDataAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.persons = action.payload;
      state.isSuccess = true;
    },
    [getFilterDataAsync.rejected]: (state, action) => {
      state.isError = true;
    },

    [updatePersonDetailsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updatePersonDetailsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.persons = state.persons.map((person) =>
        person._id === action.payload._id ? action.payload : person
      );
      state.isSuccess = true;
    },
    [updatePersonDetailsAsync.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    [deletePersonDetailsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deletePersonDetailsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.persons = state.persons.filter((person) => {
        return person._id !== action.payload.id;
      });
      state.isSuccess = true;
    },
    [deletePersonDetailsAsync.rejected]: (state, action) => {
      state.isError = true;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default personSlice.reducer;
