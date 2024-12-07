import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface FeatureImage {
  image: string;
}

interface CommonState {
  isLoading: boolean;
  featureImageList: FeatureImage[];
}

const initialState: CommonState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (image: string) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getFeatureImages.fulfilled,
        (state, action: PayloadAction<{ data: FeatureImage[] }>) => {
          state.isLoading = false;
          state.featureImageList = action.payload.data;
        }
      )
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
