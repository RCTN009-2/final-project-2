import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout, MdSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import SidebarAdmin from "../components/SidebarAdmin";

const RekapPenjualan = () => {
  const [open, setOpen] = useState(true);
  const ordersLocalStorage = JSON.parse(localStorage.getItem("orders") || "[]");

  const [orders, setOrders] = useState(ordersLocalStorage);

  const Menus = [
    { title: "Dashboard", icon: <MdSpaceDashboard /> },
    { title: "Update Stock", icon: <MdOutlineInventory /> },
    { title: "Rekap Penjualan", icon: <BsBarChartFill /> },
    { title: "Logout", icon: <MdLogout />, gap: true },
  ];

  function calculateTotal(items) {
    let totalPenghasilan = 0;
    const result = [];

    // Membuat objek untuk menyimpan jumlah dan total
    const totals = {};

    // Iterasi melalui setiap transaksi
    items.forEach((transaction) => {
      // Iterasi melalui setiap item dalam transaksi
      transaction.items.forEach((item) => {
        const { id, title, price, amount, image } = item;

        // Menambahkan total untuk item ke objek totals
        if (!totals[id]) {
          totals[id] = {
            price,
            title: title,
            amount: 0,
            total: 0,
            image,
          };
        }

        totals[id].amount += amount;
        totals[id].total += price * amount;
        totalPenghasilan += totals[id].total;
      });
    });

    // Mengonversi objek totals ke dalam bentuk array
    for (const id in totals) {
      const { title, amount, total, price, image } = totals[id];
      result.push({ title, amount, total, price, image });
    }

    return { result, totalPenghasilan };
  }

  // Contoh penggunaan dengan array yang telah diberikan
  const transactions = [
    // ... (array transactions seperti yang diberikan)
  ];

  const { result: filteredItems, totalPenghasilan } = calculateTotal(orders);

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
      <div className=" md:ml-28 ml-8 md:w-full w-3/4 mr-28">
        <div>
          <section class="py-1 bg-blueGray-50">
            <div class=" xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded text-start">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-blueGray-700">
                        Rekap Penjualan
                      </h3>
                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
                  </div>
                </div>

                <div class="block w-full overflow-x-auto">
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
                            Harga
                          </th>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Terjual
                          </th>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Pendapatan
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredItems.map((item) => (
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
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {item.price}
                            </th>
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {item.amount}
                            </th>
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {item.total}
                            </th>
                          </tr>
                        ))}
                        <tr className="border-double border-t-4 border-gray-400 py-6">
                          <td className="">
                            {/* Total Pendapatan {totalPenghasilan} */}
                          </td>
                          <td className="">
                            {/* Total Pendapatan {totalPenghasilan} */}
                          </td>
                          <td className="text-md" colSpan={2}>
                            <b>Total Pendapatan </b>
                          </td>
                          <td className="text-md " colSpan={2}>
                            <b>{parseFloat(totalPenghasilan).toFixed(2)}</b>
                          </td>
                        </tr>
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

export default RekapPenjualan;
