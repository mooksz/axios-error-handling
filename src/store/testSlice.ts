import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { callService } from "@/services/service";
import { StatusCodeResponse } from "@/schemas/statusCodeResponse";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

type Test = {
  loading: boolean;
  message: string;
  errors: string[];
};

const initialState: Test = {
  message: "",
  loading: false,
  errors: [],
};

export const testApi = createAsyncThunk<
  /** fulfillWithValue */
  StatusCodeResponse,
  /** Arguments */
  string,
  /** rejectWithValue */
  { rejectValue: string[] }
>("test/testApi", async (code, thunkApi) => {
  const { canceled, errors, data } = await callService(code, thunkApi.signal);

  if (canceled) {
    return thunkApi.rejectWithValue([]);
  }

  if (errors) {
    return thunkApi.rejectWithValue(errors);
  }

  return thunkApi.fulfillWithValue(data);
});

const test = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(testApi.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.errors = [];
      })
      .addCase(testApi.pending, (state) => {
        state.message = "";
        state.loading = true;
        state.errors = [];
      })
      .addCase(testApi.rejected, (state, action) => {
        if (action.meta.aborted) {
          state.loading = false;
          return;
        }

        state.message = "";
        state.loading = false;
        state.errors = action.payload || [ERROR_MESSAGES.UNKNOWN];
      });
  },
});

export const testSelector = (state: RootState) => state.test;
export const testReducer = test.reducer;
export const testActions = test.actions;
