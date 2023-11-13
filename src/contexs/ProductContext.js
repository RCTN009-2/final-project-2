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
