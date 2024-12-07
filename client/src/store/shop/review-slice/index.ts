import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Review {
  productId: string;
  userId: string;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
}

interface ReviewState {
  isLoading: boolean;
  reviews: Review[];
}

const initialState: ReviewState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "review/addReview",
  async (formData: {
    productId: string;
    userId: string;
    userName: string;
    reviewMessage: string;
    reviewValue: number;
  }) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      formData
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (productId: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${productId}`
    );
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getReviews.fulfilled,
        (state, action: PayloadAction<{ data: Review[] }>) => {
          state.isLoading = false;
          state.reviews = action.payload.data;
        }
      )
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
