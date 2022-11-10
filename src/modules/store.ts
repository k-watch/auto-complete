import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/search';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
