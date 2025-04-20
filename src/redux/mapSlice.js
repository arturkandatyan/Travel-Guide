import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitedCountries: [],
  wishlistCountries: [], // "Want to Go"
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
        state.visitedCountries.push(country);
        // remove from wishlist
        state.wishlistCountries = state.wishlistCountries.filter(c => c !== country);
      }
    },
    toggleWishlist: (state, action) => {
      const country = action.payload;
      if (state.wishlistCountries.includes(country)) {
        state.wishlistCountries = state.wishlistCountries.filter(c => c !== country);
      } else {
        state.wishlistCountries.push(country);
        // remove from visited
        state.visitedCountries = state.visitedCountries.filter(c => c !== country);
      }
    },
    highlightAllWishlist: (state, action) => {
      // Fill wishlistCountries with all country codes
      state.wishlistCountries = action.payload;
    },
  },
});

export const { toggleVisited, toggleWishlist, highlightAllWishlist } = mapSlice.actions;
export default mapSlice.reducer;
