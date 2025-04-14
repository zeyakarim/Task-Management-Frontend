import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = {
    auth: authReducer
};

// Configure the Redux store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false, // Disable if you have non-serializable values
    }),
});

export default store;