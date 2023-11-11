import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import icons
import { IoMdArrowForward } from "react-icons/io";
//import components
import CartItem from "../components/CartItem";
import { SideBarContext } from "../contexs/SidebarContext";
import { CartContext } from "../contexs/CartContext";
import { FiTrash2 } from "react-icons/fi";
import { ProductContext } from "../contexs/ProductContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SideBarContext);
  const { cart, clearCart, clearCartCheckout, total, itemAmount } = useContext(CartContext);
  const { products, updateStok } = useContext(ProductContext);

  const ordersLocalStorage = JSON.parse(localStorage.getItem("orders") || "[]");

  const [orders, setOrders] = useState(ordersLocalStorage);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const checkOut = () => {
    try {
      const newOrder = {
        date: new Date(Date.now()).toISOString(),
        items: cart,
      };

      const filteredProduct = products.map((product) => {
        return cart.filter((item) => item.id === product.id);
      });

      filteredProduct.map((product) => {
        const filtered = (id) => products.find((product) => product.id === id);
        const filteredCart = (id) => cart.find((product) => product.id === id);

        if (product.length > 0) {
          console.log(
            "filteredCart amount",
            filteredCart(product[0].id).amount
          );
          console.log("id", product[0].id);
          console.log("product stok", product[0].stock);
          console.log(
            "stok seharusnya sekarang",
            product[0].stock - filteredCart(product[0].id).amount
          );

          updateStok(
            product[0].id,
            product[0].stock - filteredCart(product[0].id).amount
          );
        }

        // return (
        // );
      });

      const newOrders =
        orders.length === 0 ? [newOrder] : [...orders, newOrder];

      setOrders(newOrders);

      clearCartCheckout();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 h-[320px] lg:h-350px] overflow-y-auto overflow-x-hidden border-b">
        {cart &&
          cart.length > 0 &&
          cart.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
      </div>

      <div className=" flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          {/*total */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total: </span> $
            {parseFloat(total).toFixed(2)}
          </div>
          {/*clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center"
          >
            <FiTrash2 />
          </div>
        </div>

        <button
          onClick={checkOut}
          className="bg-primary text-white p-4 rounded-md"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
