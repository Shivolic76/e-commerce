import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contents: [],
  singleProduct: {},
  newProduct: {},
  cart: [],
  productCategory: [],
  isLoading: false,
  error: null,
};

export const fetchContent: any = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    const data = await res.data;
    return data;
  }
);

export const fetchProductDetail: any = createAsyncThunk(
  "content/fetchSingleProduct",
  async (id) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const data = await res.data;
    return data;
  }
);

export const deleteProduct: any = createAsyncThunk(
  "content/deleteProduct",
  async (id) => {
    const res = await axios.delete(`https://fakestoreapi.com/products/${id}`);
    const data = await res.data;
    return data;
  }
);

export const updateProduct: any = createAsyncThunk(
  "content/updateProduct",
  async (payload: any) => {
    const { id, updatedProductData } = payload;
    const res = await axios.patch(
      `https://fakestoreapi.com/products/${id}`,
      updatedProductData
    );
    const data = await res.data;
    return data;
  }
);

export const getProductCategory: any = createAsyncThunk(
  "content/productCategory",
  async () => {
    const res = await axios.get(`https://fakestoreapi.com/products/categories`);
    const data = await res.data;
    return data;
  }
);

export const createProduct: any = createAsyncThunk(
  "content/createProduct",
  async (payload: any) => {
    const { productData } = payload;
    const res = await axios.post(
      `https://fakestoreapi.com/products`,
      productData
    );
    const data = await res.data;
    return data;
  }
);

export const categoryProduct: any = createAsyncThunk(
  "content/productcategory",
  async (category) => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = await res.data;
    return data;
  }
);
export const sortingProduct: any = createAsyncThunk(
  "content/sortingproduct",
  async (order) => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/?sort=${order}`
    );
    const data = await res.data;
    return data;
  }
);

export const productSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload;
    });
    builder.addCase(fetchProductDetail.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = { ...state.singleProduct, ...action.payload };
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProduct = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getProductCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productCategory = action.payload;
    });
    builder.addCase(getProductCategory.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(categoryProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoryProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(categoryProduct.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(sortingProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sortingProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(sortingProduct.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
