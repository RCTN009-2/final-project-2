import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout, MdSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

const SidebarAdmin = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", icon: <MdSpaceDashboard /> },
    { title: "Update Stock", icon: <MdOutlineInventory /> },
    { title: "Rekap Penjualan", icon: <BsBarChartFill /> },
    { title: "Logout", icon: <MdLogout />, gap: true },
  ];

  return (
    <div className="flex bg-gray-100">
      <div
        className={`${
          open ? "w-72" : "w-20 "
        } bg-white h-screen p-5 pt-4 relative duration-300 shadow-xl`}
      >
        <div className="">
          <GiHamburgerMenu
            className={`absolute cursor-pointer -right-10 top-5 w-7  text-xl ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="gap-x-4 items-center flex flex-col justify-center">
          <div className="flex items-center justify-center gap-x-4">
            {/* <MdSell /> */}
            <span>
              <h1
                className={`text-black font-medium text-xl duration-200 origin-left ${
                  !open && "hidden"
                }
            }`}
              >
                e-Commerce
              </h1>
            </span>
          </div>
          <hr className={`mt-4 border border-gray-300 w-full`} />{" "}
          {/* Tambahkan garis di sini */}
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-orange-300 hover:text-white hover:shadow-md text-black text-sm justify-center gap-x-4 items-center 
              ${Menu.gap ? "mt-96" : "mt-10"} ${index === 0 && ""} `}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
