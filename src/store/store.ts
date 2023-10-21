import { productSlice, productsSliceName } from "@/slices/product.slice";
import { configureStore } from "@reduxjs/toolkit";
import { productsListenerMiddleware } from "@/slices/product.slice";

const storeReducers = {
  [productsSliceName]: productSlice.reducer,
};

export const store = configureStore({
  reducer: storeReducers,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    productsListenerMiddleware.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
