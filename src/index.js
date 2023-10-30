import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProductProvider from "./contexs/ProductContext";
import CartProvider from "./contexs/CartContext";
import SideBarProvider from "./contexs/SidebarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SideBarProvider>
    <ProductProvider>
      <CartProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartProvider>
    </ProductProvider>
  </SideBarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
