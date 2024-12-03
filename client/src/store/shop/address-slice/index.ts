import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type AddressFormData = {
  _id?: string;
  userId?: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  notes: string;
};

interface AddressState {
  isLoading: boolean;
  addressList: AddressFormData[];
}

const initialState: AddressState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async (formData: AddressFormData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "addresses/fetchAllAddresses",
  async (userId: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({
    userId,
    addressId,
    formData,
  }: {
    userId: string;
    addressId: string;
    formData: Partial<AddressFormData>;
  }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ userId, addressId }: { userId: string; addressId: string }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllAddresses.fulfilled,
        (state, action: PayloadAction<{ data: AddressFormData[] }>) => {
          state.isLoading = false;
          state.addressList = action.payload.data;
        }
      )
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
