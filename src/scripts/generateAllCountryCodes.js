import { writeFileSync } from "fs";
import topojson from "topojson-client"; // if you're using ESM

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

fetch(geoUrl)
  .then(res => res.json())
  .then((data) => {
    // Convert TopoJSON into GeoJSON for easier manipulation
    const geoJson = topojson.feature(data, data.objects.countries);
    
    // Log the first few features to inspect their structure
    console.log("First few country features: ", geoJson.features.slice(0, 5));

    // Extract the country codes (ISO_A3 in this case) from each feature
    const codes = geoJson.features
      .map(c => c.ISO_A3) // Use the ISO_A3 property for the country code
      .filter(Boolean); // Filter out any falsy values (e.g., undefined)

    // Log the country codes to check them
    console.log("Extracted country codes: ", codes);

    // Write the codes to a JS file
    writeFileSync("./src/allCountryCodes.js", `export default ${JSON.stringify(codes, null, 2)};\n`);
    console.log("✅ allCountryCodes.js generated with", codes.length, "codes");
  })
  .catch((error) => console.error("Error fetching data:", error));
