import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapChart from "./components/MapChart";
import { toggleVisited, toggleWishlist, highlightAllWishlist } from "./redux/mapSlice";
import allCountryCodes from "./allCountryCodes";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const dispatch = useDispatch();
  const { visitedCountries, wishlistCountries } = useSelector(state => state.map);

  useEffect(() => {
    if (visitedCountries.length === 0 && wishlistCountries.length === 0) {
      dispatch(highlightAllWishlist(allCountryCodes));
    }
  }, [dispatch, wishlistCountries.length]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1a1a1a" : "#f0f0f0",
        color: darkMode ? "#ffffff" : "#000000",
        border: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Where Do You Want to Go?
      </h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: darkMode ? "#333" : "#ddd",
            color: darkMode ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <MapChart
          mapName="Visited"
          countries={visitedCountries}
          onCountryClick={(code) => dispatch(toggleVisited(code))}
          darkMode={darkMode}
        />
        <MapChart
          mapName="Want to Go"
          countries={wishlistCountries}
          onCountryClick={(code) => dispatch(toggleWishlist(code))}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default App;
