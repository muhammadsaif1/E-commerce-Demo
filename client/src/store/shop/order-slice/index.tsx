import { ProductFormData } from "@/components/common/form";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface OrderState {
  isLoading: boolean;
  orderId: string | null;
  orderList: ProductFormData[];
  orderDetails: ProductFormData | null;
}

const initialState: OrderState = {
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// Thunk to create a new order
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );
    return response.data;
  }
);

// Thunk to confirm an order
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (orderId: string) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/confirm",
      { orderId }
    );
    return response.data;
  }
);

// Thunk to get all orders by user ID
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

// Thunk to get order details by ID
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create New Order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })
      // Confirm Order
      .addCase(confirmOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(confirmOrder.rejected, (state) => {
        state.isLoading = false;
      })
      // Get All Orders by User ID
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
