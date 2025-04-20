import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapChart from "./components/MapChart";
import { toggleVisited, toggleWishlist, highlightAllWishlist } from "./redux/mapSlice";
import allCountryCodes from "./allCountryCodes";  // Make sure allCountryCodes is imported correctly

const App = () => {
  const dispatch = useDispatch();
  const { visitedCountries, wishlistCountries } = useSelector(state => state.map);

  useEffect(() => {
    // Dispatch highlightAllWishlist action to highlight all countries at startup
    if (wishlistCountries.length === 0) {
      dispatch(highlightAllWishlist(allCountryCodes));  // Pass all country codes to highlight all countries
    }
  }, [dispatch, wishlistCountries.length]);  // Ensure it's only called when wishlistCountries is empty initially

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Where Do You Want to Go?
      </h1>

      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
        <MapChart
          mapName="Visited"
          countries={visitedCountries}
          onCountryClick={(code) => dispatch(toggleVisited(code))}
        />
        <MapChart
          mapName="Want to Go"
          countries={wishlistCountries}
          onCountryClick={(code) => dispatch(toggleWishlist(code))}
        />
      </div>
    </div>
  );
};

export default App;
