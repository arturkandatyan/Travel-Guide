// src/components/MapChart.js
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = ({ mapName, countries, onCountryClick }) => {
  console.log("Countries prop in MapChart:", countries); // Log here

  return (
    <div style={{ width: "550px", padding: "1rem", border: "1px solid #ccc" }}>
      <h2 style={{ textAlign: "center" }}>{mapName}</h2>
      <ComposableMap width={500} height={300} projectionConfig={{ scale: 150 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const code = geo.properties.ISO_A3; // Adjust if needed
              const isHighlighted = countries.includes(code);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onCountryClick(code)}
                  style={{
                    default: {
                      fill: isHighlighted ? "#FF5722" : "#D6D6DA",
                      outline: "none",
                    },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;