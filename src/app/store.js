import { configureStore } from '@reduxjs/toolkit';

import todoReducer from '../features/store/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});