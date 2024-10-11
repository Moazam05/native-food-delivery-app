// Redux Toolkit Imports
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist'; // Persist utilities
import {apiSlice} from './api/apiSlice';
import authReducer from './auth/authSlice';
import userReducer from './users/userSlice';
import wishListReducer from './wishlist/wishlistsSlice';
import productsReducer from './products/productsSlice';
import addressReducer from './address/addressSlice';

// Configurations for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users', 'wishListProducts', 'products', 'address'],
};

// Combine your reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  users: userReducer,
  wishListProducts: wishListReducer,
  products: productsReducer,
  address: addressReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

// Export the persistor
export const persistor = persistStore(store);
