import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const productList = createAsyncThunk('product/list', async () => {
    const response = await axios.get('http://localhost:8080/api/products/getallproducts', {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });
    console.log(response.data);
    return response.data;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(productList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(productList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
