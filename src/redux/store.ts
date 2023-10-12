import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice, } from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {}
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// normal //

// import { configureStore } from "@reduxjs/toolkit";
// import productSlice from "./slices/productSlice";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { cartSlice } from "./slices/cartSlice";

// export const store = configureStore({
//   reducer: {
//     products: productSlice,
//     cart: cartSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// Redux Peristance //

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import productSlice from "./slices/productSlice";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { cartSlice } from "./slices/cartSlice";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; //

// const persistConfig = {
//   key: "rootData",
//   storage,
// };
// const rootReducer = combineReducers({
//   products: productSlice,
//   cart: cartSlice.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
