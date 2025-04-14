import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => ({
        ...state,
        ...action.payload,
        }),
        reset: (state, action) => initialState,
    },
});

export const { setAuth, reset } = authSlice.actions;

export default authSlice.reducer;