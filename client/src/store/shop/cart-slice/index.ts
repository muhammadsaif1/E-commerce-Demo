import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  quantity: number;
  userId: string;
  image?: string;
  title?: string;
  price?: number;
  salePrice?: number;
}

interface CartState {
  cartItems: {
    items: CartItem[];
    _id?: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: { items: [] },
  isLoading: false,
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch cart items");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (
    { userId, productId }: Pick<CartItem, "userId" | "productId">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to delete item from cart");
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to update cart quantity");
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    resetCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<{ data: CartState["cartItems"] }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<{ data: CartState["cartItems"] }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateCartQuantity.fulfilled,
        (state, action: PayloadAction<{ data: CartState["cartItems"] }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteCartItem.fulfilled,
        (state, action: PayloadAction<{ data: CartState["cartItems"] }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCartError } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
