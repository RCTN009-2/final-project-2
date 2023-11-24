import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout, MdSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import SidebarAdmin from "../components/SidebarAdmin";
import { ProductContext } from "../contexs/ProductContext";

const UpdateStok = () => {
  const [open, setOpen] = useState(true);

  const [inputValues, setInputValues] = useState({});
  const [stok, setStok] = useState(0);

  const { products, setProducts, updateStok } = useContext(ProductContext);

  const Menus = [
    { title: "Dashboard", icon: <MdSpaceDashboard /> },
    { title: "Update Stock", icon: <MdOutlineInventory /> },
    { title: "Rekap Penjualan", icon: <BsBarChartFill /> },
    { title: "Logout", icon: <MdLogout />, gap: true },
  ];

  const filteredProducts = products.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  });

  return (
    <div className="flex bg-gray-100 overflow-y-hidden">
      {/* <div
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
      </div> */}
      <SidebarAdmin />
      <div className=" md:ml- ml-8 md:w-full w-3/4 mr-8">
        <div>
          <section class="py-1 bg-blueGray-50">
            <div class=" xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded text-start">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-blueGray-700">
                        Update Stock
                      </h3>
                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
                  </div>
                </div>

                <div class="block w-full ">
                  <div className="max-h-[600px] overflow-y-auto">
                    <table class="items-center bg-transparent w-full border-collapse ">
                      <thead>
                        <tr>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Image
                          </th>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Products
                          </th>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Stock
                          </th>
                          {/* <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Action
                        </th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {filteredProducts.map((item) => (
                          <tr>
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              <img
                                className="max-h-[100px] group-hover:scale-110 transition duraion-300"
                                src={item.image}
                                alt=""
                              />
                            </th>
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {item.title}
                            </th>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                              <input
                                class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                defaultValue={
                                  inputValues[item.id] || item.stock
                                }
                                value={inputValues[item.id]}
                                onChange={(e) =>
                                  setInputValues({
                                    ...inputValues,
                                    [item.id]: e.target.value,
                                  })
                                }
                              ></input>
                              <button
                                class="bg-orange-300 text-white font-bold py-2 px-4 rounded-lg ml-4"
                                onClick={() =>
                                  updateStok(
                                    item.id,
                                    inputValues[item.id] || item.stock
                                  )
                                }
                              >
                                Update
                              </button>
                            </td>
                            {/* <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button
                              class="bg-orange-300 text-white font-bold py-2 px-4 rounded-lg"
                              // onClick={() => UpdateStok(item.id, stok)}
                            >
                              Update
                            </button>
                          </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UpdateStok;
