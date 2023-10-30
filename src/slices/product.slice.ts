import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { readFromLocalStorage, saveToLocalStorage } from "@/utils/storage";

type Products = {
  [productId: string]: {
    productName: string;
    price: string;
    amount: number;
    size?: string;
  };
}[];

type PayloadProduct = {
  productId: number;
  productName: string;
  price: string;
  amount: number;
  size?: string;
};

export const productsSliceName = "products";

const getInitialState = () => {
  const products: Products = readFromLocalStorage<Products>({
    key: productsSliceName,
    fallbackValue: [],
  });
  return products;
};
export const productSlice = createSlice({
  name: "products",
  initialState: getInitialState(),
  reducers: {
    addProductToCart: (state, { payload }: PayloadAction<PayloadProduct>) => {
      const currentProductIndex = state.findIndex((item) => {
        return item[payload.productId];
      });
      if (currentProductIndex === -1) {
        return (state = [
          ...state,
          {
            [payload.productId]: {
              productName: payload.productName,
              price: payload.price,
              amount: payload.amount,
              size: payload.size,
            },
          },
        ]);
      } else {
        state[currentProductIndex][payload.productId] = {
          ...state[currentProductIndex][payload.productId],
          amount: payload.amount,
          size: payload.size,
        };
      }
    },
  },
});

export const { addProductToCart } = productSlice.actions;

export const products = (state: RootState) => {
  return state.products;
};

export const productsListenerMiddleware = createListenerMiddleware();
productsListenerMiddleware.startListening({
  matcher: isAnyOf(addProductToCart),
  effect: (action, listenerApi) => {
    saveToLocalStorage({
      key: productsSliceName,
      value: (listenerApi.getState() as RootState)[productsSliceName],
    });
  },
});
