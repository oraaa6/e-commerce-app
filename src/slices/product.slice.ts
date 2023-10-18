import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

type Products = {
  [productId: string]: {
    productName: string;
    price: string;
    amount: number;
    size?: string;
  };
}[];

type PayloadProduct = {
  productId: string;
  productName: string;
  price: string;
  amount: number;
  size?: string;
};

export const productsSliceName = "products";

const initialState: Products = [];
export const productSlice = createSlice({
  name: "products",

  initialState,
  reducers: {
    updateProducts: (state, { payload }: PayloadAction<PayloadProduct>) => {
      const currentProduct = state.find(
        (product) => product[payload.productId]
      );
      state = [
        ...state,
        {
          ...currentProduct,
          [payload.productId]: {
            ...payload,
            productName: payload.productName,
            price: payload.price,
            amount: payload.amount,
            size: payload.size,
          },
        },
      ];
    },
  },
});

export const { updateProducts } = productSlice.actions;

export const products = (state: RootState) => {
  return state;
};
