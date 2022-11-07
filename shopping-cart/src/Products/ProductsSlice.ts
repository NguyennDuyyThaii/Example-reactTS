import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import validateProduct from "../fake.api";
import { RootState } from "../store";

interface Product {
  title: string;
  price: number;
  id: string;
}

export enum ValidationState {
    Fulfilled,
    Pending,
    Rejected
}

interface ProductSliceState {
    products: Product[],
    validationState?: ValidationState,
    errorMessage?: String
}

const initialProducts: Product[] = [
    { title: "hihi", price: 34, id: "1" },
    { title: "hihi", price: 34, id: "2" },
    { title: "hihi", price: 34, id: "3" },
];

export const addProductAsync = createAsyncThunk('products/addNewProduct', async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct)
    return product
})



const initialState: ProductSliceState = {
    products: initialProducts,
    validationState: undefined,
    errorMessage: undefined
}
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => ({
        ...state,
        products: state.products.filter((product) => product.id !== action.payload)
    }),
  },
  extraReducers: builder => {
    return builder.addCase(addProductAsync.fulfilled,(state, action) => ({
        ...state,
        validationState: ValidationState.Fulfilled,
        errorMessage: undefined,
        products: [...state.products, action.payload]
    })),
    builder.addCase(addProductAsync.rejected, (state, action) => ({
        ...state,
        validationState: ValidationState.Rejected,
        errorMessage: action.error.message
    })),
    builder.addCase(addProductAsync.pending, (state, action) => ({
        ...state,
        validationState: ValidationState.Pending,
        errorMessage: undefined
    }))
  }
});

export const { addProduct, removeProduct } = productsSlice.actions;
export const getProductsSelector = (state: RootState) => state.products.products;
export const getErrorMessage = (state: RootState) => state.products.errorMessage;
export default productsSlice.reducer;
