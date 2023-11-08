import React, { createContext,  useEffect, useState, useContext } from "react";
import { ProductContext } from "../contexs/ProductContext";
export const CartContext = createContext();


const CartProvider = ({ children }) => {
  //cart state
  const [cart, setCart] = useState([]);
  //item amount state
  const [itemAmount, setItemAmount] = useState(0);
  //total price store
  const [total, setTotal] = useState(0);

  const { products, setProducts } = useContext(ProductContext);


  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);
  
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);
  

  const checkout = () => {
    // Lakukan validasi stok dan kurangi stok
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
  
      if (cartItem && cartItem.amount <= product.stock) {
        // Kurangi stok sesuai dengan jumlah pembelian
        product.stock -= cartItem.amount;
      } else {
        console.error(`Stok tidak mencukupi untuk ${product.title}`);
      }
  
      // Pastikan stok tidak menjadi negatif
      product.stock = Math.max(product.stock, 0);
  
      return product;
    });
  
    // Perbarui stok di ProductContext
    setProducts(updatedProducts);
  
    // Kosongkan keranjang setelah checkout
    clearCart();
  };
  
  

  //add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
  
    // check if item is already in the cart
    const cartItem = cart.find((item) => item.id === id);
  
    // Check if stock is greater than 0 before adding to cart
    if (product.stock > 0) {
      // if cart item is already in the cart
      if (cartItem) {
        const newCart = cart.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
        setCart(newCart);
  
        // update stock when the item is added
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, stock: Math.max(product.stock - 1, 0) } : product
          )
        );
      } else {
        // Add the item to the cart
        setCart([...cart, newItem]);
  
        // update stock when the item is added
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, stock: Math.max(product.stock - 1, 0) } : product
          )
        );
      }
    } else {
      console.warn(`Stok untuk item ${product.title} tidak mencukupi`);
    }
  };

  //remove from cart
  const removeFromCart = (id) => {
    // Find the item in the cart
    const removedItem = cart.find((item) => item.id === id);
  
    if (removedItem) {
      // Update stock when the item is removed
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, stock: product.stock + removedItem.amount }
            : product
        )
      );
  
      // Remove the item from the cart
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
    }
  };
  
  //increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
  
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(newCart);
    }
  
    // Update stock when the item amount is increased
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(product.stock - 1, 0) }
          : product
      )
    );
  };
  

  //decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
  
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: Math.max(item.amount - 1, 0) } : item
      );
      setCart(newCart);
    }
  
    // Update stock when the item amount is decreased
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + 1 }
          : product
      )
    );
  };
  
  const clearCart = () => {
    // Restore stock for each item in the cart
    cart.forEach((item) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === item.id
            ? { ...product, stock: product.stock + item.amount }
            : product
        )
      );
    });
  
    // Clear the cart
    setCart([]);
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
