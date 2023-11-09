import React, { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../contexs/SidebarContext";
import { BsCart } from "react-icons/bs";
import { CartContext } from "../contexs/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const { itemAmount } = useContext(CartContext);
  // const loggedIn = localStorage.getItem('token') === 'tokencustomer'

  const navigate = useNavigate ()
  const handleLogout = () =>{
    localStorage.removeItem ('token')
    navigate('/')
  }

  // Event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="mx-8">Home</div>
        </Link>
        <div className="flex items-center">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative mx-7"
          >
            <BsCart className="text-2xl ml-0 mr-2" />
            <span className="mr-2">My Cart</span>
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
          {localStorage.getItem("token") === "tokencustomer" ? (
              <div onClick={handleLogout} className="mr-0">Logout</div>
          ) : (
            <Link to={"/login"}>
              <div className="mr-0">Login</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
