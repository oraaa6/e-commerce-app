import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { readFromLocalStorage, saveToLocalStorage } from "@/utils/storage";

type Product = {
  [productId: string]: {
    productName: string;
    price: string;
    amount: number;
    size: string;
    thumbnail: string;
  };
};

type PayloadProduct = {
  productId: number;
  productName: string;
  price: string;
  amount: number;
  size: string;
  thumbnail: string;
};

export const productsSliceName = "products";

const getInitialState = () => {
  const products: Product[] = readFromLocalStorage<Product[]>({
    key: productsSliceName,
    fallbackValue: [],
  });
  return products;
};
export const productSlice = createSlice({
  name: "products",
  initialState: getInitialState(),
  reducers: {
    addProductToCart: (
      state,
      {
        payload: { productId, productName, price, amount, size, thumbnail },
      }: PayloadAction<PayloadProduct>
    ) => {
      const currentProductIndex = state.findIndex((item) => {
        return item[productId];
      });
      if (currentProductIndex === -1) {
        state = [
          ...state,
          {
            [productId]: {
              productName,
              price,
              amount,
              size,
              thumbnail,
            },
          },
        ];
      } else {
        state[currentProductIndex][productId] = {
          ...state[currentProductIndex][productId],
          amount,
          size,
        };
      }
      return state;
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

// import {
//   createListenerMiddleware,
//   createSlice,
//   isAnyOf,
//   PayloadAction,
// } from "@reduxjs/toolkit";
// import type { RootState } from "@/store/store";
// import { readFromLocalStorage, saveToLocalStorage } from "@/utils/storage";

// type Products = {
//   [productId: string]: {
//     productName: string;
//     price: string;
//     amount: number;
//     size: string;
//   };
// }[];

// type PayloadProduct = {
//   productId: number;
//   productName: string;
//   price: string;
//   amount: number;
//   size: string;
// };

// export const productsSliceName = "products";

// const getInitialState = () => {
//   const products: Products = readFromLocalStorage<Products>({
//     key: productsSliceName,
//     fallbackValue: [],
//   });
//   return products;
// };
// export const productSlice = createSlice({
//   name: "products",
//   initialState: getInitialState(),
//   reducers: {
//     addProductToCart: (
//       state,
//       {
//         payload: { productId, productName, price, amount, size },
//       }: PayloadAction<PayloadProduct>
//     ) => {
//       const currentProductIndex = state.findIndex((item) => {
//         return item[productId];
//       });

//       if (currentProductIndex === -1) {
//         return (state = [
//           ...state,
//           {
//             [productId]: {
//               productName,
//               price,
//               amount,
//               size,
//             },
//           },
//         ]);
//       } else {
//         state[currentProductIndex][productId] = {
//           ...state[currentProductIndex][productId],
//           amount,
//           size,
//         };
//       }
//     },
//   },
// });

// export const { addProductToCart } = productSlice.actions;

// export const products = (state: RootState) => {
//   return state.products;
// };

// export const productsListenerMiddleware = createListenerMiddleware();
// productsListenerMiddleware.startListening({
//   matcher: isAnyOf(addProductToCart),
//   effect: (action, listenerApi) => {
//     saveToLocalStorage({
//       key: productsSliceName,
//       value: (listenerApi.getState() as RootState)[productsSliceName],
//     });
//   },
// });
