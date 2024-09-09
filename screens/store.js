// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './Reducer';

const store = configureStore({
  reducer,
  // Bạn có thể thêm middleware ở đây nếu cần
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;