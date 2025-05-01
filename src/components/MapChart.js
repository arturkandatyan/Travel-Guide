import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = ({ mapName, countries, onCountryClick, darkMode }) => {
  const highlightColor = mapName === "Visited" ? "#009c49" : "#005d93";
  const hoverColor = mapName === "Visited" ? "#00ff77" : "#00a1ff";
  const defaultFill = darkMode ? "#3a3a3a" : "#D6D6DA";
  const borderColor = darkMode ? "#555" : "#ccc";
  const isMobile = window.innerWidth < 450;
  const [tooltip, setTooltip] = useState({ name: "", x: 0, y: 0, visible: false });

  return (
    <div
      style={{
        width: isMobile ? "100%" : "40%",
        maxWidth: isMobile ? "100%" : "40%",
        padding: "1rem",
        border: `1px solid ${borderColor}`,
        boxSizing: "border-box",
        position: "relative",
        backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
        borderRadius: "8px",
        transition: "background-color 0.3s ease"
      }}
      onMouseMove={(e) => {
        setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
      }}
    >
      <h2 
        style={{ 
          textAlign: "center", 
          color: darkMode ? "#eee" : "#111",
          fontSize: isMobile ? "1rem" : "2rem"
        }}>
        {mapName}
      </h2>
      <ComposableMap
        width={isMobile ? 320 : 500}
        height={isMobile ? 200 : 300}
        projectionConfig={{ scale: isMobile ? 80 : 100 }}
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const code = geo.id;
              const name = geo.properties.name;
              const isHighlighted = countries.includes(code);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onCountryClick(code)}
                  onMouseEnter={() =>
                    setTooltip({ name, x: tooltip.x, y: tooltip.y, visible: true })
                  }
                  onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
                  style={{
                    default: {
                      fill: isHighlighted ? highlightColor : defaultFill,
                      outline: "none",
                    },
                    hover: { fill: hoverColor, outline: "none" },
                    pressed: { fill: "#8022c1", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
            padding: "6px 10px",
            border: `1px solid ${darkMode ? "#888" : "#ccc"}`,
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: "0.9rem",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
};

export default MapChart;
