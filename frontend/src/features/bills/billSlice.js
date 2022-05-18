import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import billService from './billService';

const initialState = {
    bills: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new bill
export const createBill = createAsyncThunk(
    'bills/create',
    async (billData, thunkAPI) => {
        try {
            const user = thunkAPI.getState().auth.user;
            if (!user) {
                return thunkAPI.rejectWithValue('You must be logged in to create a reminder.');
            }
            const token = user.token;
            return await billService.createBill(billData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user bills
export const getBills = createAsyncThunk(
    'bills/getAll',
    async (_, thunkAPI) => {
        try {
            const user = thunkAPI.getState().auth.user;
            if (!user) {
                return [];
            }
            const token = user.token;
            return await billService.getBills(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete user bill
export const deleteBill = createAsyncThunk(
    'bills/delete',
    async (id, thunkAPI) => {
        try {
            const user = thunkAPI.getState().auth.user;
            if (!user) {
                return thunkAPI.rejectWithValue('You must be logged in to delete a reminder.');
            }
            const token = user.token;
            return await billService.deleteBill(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBill.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBill.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bills.push(action.payload);
            })
            .addCase(createBill.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBills.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBills.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bills = action.payload;
            })
            .addCase(getBills.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteBill.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBill.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bills = state.bills.filter(
                    (bill) => bill._id !== action.payload.id
                );
            })
            .addCase(deleteBill.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = billSlice.actions;
export default billSlice.reducer;