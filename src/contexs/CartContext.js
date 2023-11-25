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
  const { setProducts, updateStock } = useContext(ProductContext);

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
      updateStock(id, removedItem.stock);

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
    updateStock((prevProducts) =>
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
      const newAmount = Math.max(cartItem.amount - 1, 0);

      if (newAmount === 0) {
        // Remove item from cart if amount becomes 0
        removeFromCart(id);
      } else {
        const newCart = cart.map((item) =>
          item.id === id ? { ...item, amount: newAmount } : item
        );
        setCart(newCart);

        // Update stock when the item amount is decreased
        updateStock(id, cartItem.stock);
      }
    }
  };

  const clearCart = () => {
    // Restore stock for each item in the cart
    cart.forEach((item) => {
      // Mengembalikan stok produk saat keranjang dikosongkan
      updateStock(item.id, item.stock);
    });

    // Setel keranjang menjadi kosong setelah mengembalikan stok
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
