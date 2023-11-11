// ProductProvider.js
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const productsLocalStorage = JSON.parse(
    localStorage.getItem("products") || "[]"
  );
  const [products, setProducts] = useState(productsLocalStorage);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const updateStok = (id, stok) => {
    const productItem = products.find((item) => item.id === id);

    if (productItem) {
      const newProducts = products.map((item) =>
        item.id === id ? { ...item, stock: stok } : item
      );
      setProducts(newProducts);
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateStok }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
