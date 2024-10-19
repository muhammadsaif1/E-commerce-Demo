import { ProductFormData } from "@/components/common/form";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (FormData: ProductFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/add",
        FormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/products/get"
      );
      return response?.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`
      );
      return response?.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }: { id: string; formData: ProductFormData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
