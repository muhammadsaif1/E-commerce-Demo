import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductFormData } from "@/components/common/form";

interface FetchProductsResponse {
  data: ProductFormData[];
}

interface FetchProductDetailsResponse {
  data: ProductFormData;
}

export interface FilterParams {
  [key: string]: string[];
}

export interface SortParams {
  sortBy: string;
}

interface ShoppingProductState {
  isLoading: boolean;
  productList: ProductFormData[];
  productDetails: ProductFormData | null;
}

const initialState: ShoppingProductState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk<
  FetchProductsResponse,
  { filterParams: FilterParams; sortParams: SortParams }
>("/products/fetchAllProducts", async ({ filterParams, sortParams }) => {
  const query = new URLSearchParams({
    ...filterParams,
    sortBy: sortParams.sortBy,
  });

  const result = await axios.get<FetchProductsResponse>(
    `http://localhost:5000/api/shop/products/get?${query}`
  );

  return result.data;
});

export const fetchProductDetails = createAsyncThunk<
  FetchProductDetailsResponse,
  string
>("/products/fetchProductDetails", async (id) => {
  const result = await axios.get<FetchProductDetailsResponse>(
    `http://localhost:5000/api/shop/products/get/${id}`
  );

  return result.data;
});

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllFilteredProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsResponse>) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        }
      )
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<FetchProductDetailsResponse>) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
        }
      )
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
