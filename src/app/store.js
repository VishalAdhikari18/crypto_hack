import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer, // Add the RTK Query reducer for cryptoApi
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // Add other reducers if any
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware), // Add the cryptoNewsApi middleware
});
export default store;

    