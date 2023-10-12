import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
}

export interface WishlistState {
  wishlistItems: Product[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.wishlistItems.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

const selectWishlistItems = (state: RootState) => state.wishlist.wishlistItems;

export const isProductInWishlistSelector = createSelector(
  [selectWishlistItems, (_: RootState, productId: number) => productId],
  (wishlistItems, productId) =>
    wishlistItems.some((item) => item.id === productId)
);

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
