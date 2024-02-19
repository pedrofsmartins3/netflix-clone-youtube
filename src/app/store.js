import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// aqui esta o nosso Redux
// em userSlice.js tem as funções que usamos com o Redux