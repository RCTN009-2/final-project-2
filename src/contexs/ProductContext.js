// ProductProvider.js
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const productsLocalStorage = JSON.parse(
    localStorage.getItem("products") || "[]"
  );
  const [products, setProducts] = useState(productsLocalStorage);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Tambahkan properti 'stock' pada setiap produk
        const productsWithStock = data.map((product) => ({
          ...product,
          stock: 20, // Misalnya, setiap produk memiliki stok awal 20
        }));
        console.log(productsWithStock);
        setProducts(productsWithStock);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const updateStock = (id, stok) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === id ? { ...item, stock: stok } : item
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
