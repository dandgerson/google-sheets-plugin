import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { mainApi } from '../services/main-api';
import treeviewReducer from '../components/treeview/treeview-slice';

console.log('ho');

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    treeview: treeviewReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

setupListeners(store.dispatch);
