import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderData, OrderState } from "@/store/shop/order-slice";

interface AdminOrderState extends Omit<OrderState, "orderId"> {
  isUpdating: boolean;
}

const initialState: AdminOrderState = {
  isLoading: false,
  isUpdating: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk<OrderData[], void>(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );
    return response.data.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk<OrderData, string>(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );
    return response.data.data;
  }
);

export const updateOrderStatus = createAsyncThunk<
  OrderData,
  { id: string; orderStatus: string }
>("/order/updateOrderStatus", async ({ id, orderStatus }) => {
  const response = await axios.put(
    `http://localhost:5000/api/admin/orders/update/${id}`,
    { orderStatus }
  );
  return response.data.data;
});

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllOrdersForAdmin.fulfilled,
        (state, action: PayloadAction<OrderData[]>) => {
          state.isLoading = false;
          state.orderList = action.payload;
        }
      )
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOrderDetailsForAdmin.fulfilled,
        (state, action: PayloadAction<OrderData>) => {
          state.isLoading = false;
          state.orderDetails = action.payload;
        }
      )
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        console.log("Error fetching order details:", action.error);
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<OrderData>) => {
          state.isUpdating = false;
          const updatedOrderIndex = state.orderList.findIndex(
            (order) => order._id === action.payload._id
          );
          if (updatedOrderIndex !== -1) {
            state.orderList[updatedOrderIndex] = action.payload;
          }

          if (state.orderDetails?._id === action.payload._id) {
            state.orderDetails = action.payload;
          }
        }
      )
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isUpdating = false;
        console.log("Error updating order status");
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
