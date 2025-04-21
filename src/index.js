import React from "react";
import ReactDOM from "react-dom/client"; // ← note the "/client" here!
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
