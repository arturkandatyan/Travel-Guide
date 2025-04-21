import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitedCountries: [],
  wishlistCountries: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    toggleVisited: (state, action) => {
      const country = action.payload;
      if (state.visitedCountries.includes(country)) {
        state.visitedCountries = state.visitedCountries.filter(c => c !== country);
      } else {
        // Mark visited, remove from wishlist
        state.visitedCountries.push(country);
        state.wishlistCountries = state.wishlistCountries.filter(c => c !== country);
      }
    },
    toggleWishlist: (state, action) => {
      const country = action.payload;
      if (state.wishlistCountries.includes(country)) {
        state.wishlistCountries = state.wishlistCountries.filter(c => c !== country);
      } else {
        // remove
        state.wishlistCountries.push(country);
        state.visitedCountries = state.visitedCountries.filter(c => c !== country);
      }
    },
    highlightAllWishlist: (state, action) => {
      const allCodes = action.payload.map(c => c.code);
      state.wishlistCountries = allCodes;
      state.visitedCountries = [];
    }
  }
});

export const { toggleVisited, toggleWishlist, highlightAllWishlist } = mapSlice.actions;
export default mapSlice.reducer;
