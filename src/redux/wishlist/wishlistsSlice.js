// Redux Toolkit Imports
import {createSlice} from '@reduxjs/toolkit';

const findProductIndex = (wishlist, productId) =>
  wishlist.findIndex(product => product.id === productId);

const wishlistsSlice = createSlice({
  name: 'wishlists',
  initialState: {
    data: [],
  },
  reducers: {
    setWishListProducts(state, action) {
      const product = action.payload;
      const existingProductIndex = findProductIndex(state.data, product.id);

      if (existingProductIndex >= 0) {
        // Remove product if it exists
        state.data.splice(existingProductIndex, 1);
      } else {
        // Add new product to the wishlist
        state.data.push(product);
      }
    },

    // Clear the wishlist
    clearWishListProducts(state) {
      state.data = [];
    },
  },
});

export const {setWishListProducts, clearWishListProducts} =
  wishlistsSlice.actions;
export default wishlistsSlice.reducer;

export const selectWishlistProducts = state => state.wishListProducts.data;
