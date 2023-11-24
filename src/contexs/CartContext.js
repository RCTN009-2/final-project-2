import React, { createContext, useEffect, useState, useContext } from "react";
import { ProductContext } from "../contexs/ProductContext";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  //item amount state
  const [itemAmount, setItemAmount] = useState(0);
  //total price store
  const [total, setTotal] = useState(0);

  const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

  const [cart, setCart] = useState(cartLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const { setProducts } = useContext(ProductContext);

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

  //add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => item.id === id);

    if (product.stock > 0) {
      if (cartItem) {
        const newCart = cart.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
        setCart(newCart);
      } else {
        setCart([...cart, newItem]);
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
        item.id === id
          ? { ...item, amount: Math.max(item.amount - 1, 0) }
          : item
      );
      setCart(newCart);
    }

    // Update stock when the item amount is decreased
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, stock: product.stock + 1 } : product
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

  const clearCartCheckout = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        clearCartCheckout,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
