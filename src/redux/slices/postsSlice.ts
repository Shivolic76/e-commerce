// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { fetchProducts } from "../api/api";

// const fetchProductsAsync = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await fetchProducts();
//     return response.data;
//   }
// );

// const initialState: any = [];

// const postsSlice = createSlice({
//   name: "posts",
//   initialState: initialState,
//   reducers: {
//     addPost: (state, action: PayloadAction<any>) => {
//       const { id, title, description } = action.payload;
//       state.push({ id, title, description });
//     },
//     deletePost: (state, action: PayloadAction<any>) => {
//       const postId = action.payload;
//       return state.filter((post: any) => post.id !== postId);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProductsAsync.fulfilled, (state, action) => {
//         console.log(action.payload);
//       })
//   },
// });

// export const { addPost, deletePost } = postsSlice.actions;
// export default postsSlice.reducer;
