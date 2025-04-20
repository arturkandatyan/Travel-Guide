// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";

// Load from localStorage
const loadState = () => {
  try {
    const state = localStorage.getItem("mapState");
    return state ? JSON.parse(state) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const { visitedCountries, wishlistCountries } = state;
    // Prevent saving if invalid
    if (Array.isArray(visitedCountries) && visitedCountries.includes(null)) return;
    if (Array.isArray(wishlistCountries) && wishlistCountries.includes(null)) return;

    localStorage.setItem("mapState", JSON.stringify(state));
  } catch {}
};

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
  preloadedState: {
    map: loadState() || {
      visitedCountries: [],
      wishlistCountries: [],
    },
  },
});

// Subscribe to state changes and save
store.subscribe(() => {
  saveState(store.getState().map);
});

export default store;
