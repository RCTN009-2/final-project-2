import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import UpdateStok from "./pages/updateStok";
import RekapPenjualan from "./pages/rekapPenjualan";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

// Layout dengan sidebar dan footer
function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  const cart = localStorage.getItem("cart");
  const orders = localStorage.getItem("orders");

  const productsLocalStorage = JSON.parse(
    localStorage.getItem("products") || "[]"
  );
  const [products, setProducts] = useState(productsLocalStorage);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (!cart) localStorage.setItem("cart", JSON.stringify([]));
    if (!orders) localStorage.setItem("orders", JSON.stringify([]));
    if (!products) localStorage.setItem("products", JSON.stringify([]));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Tambahkan properti 'stock' pada setiap produk
        const productsWithStock = data.map((product) => ({
          ...product,
          stock: 0, // Misalnya, setiap produk memiliki stok awal 20
        }));

        setProducts(productsWithStock);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (!products) fetchProducts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateStok" element={<UpdateStok />} />
          <Route path="/rekapPenjualan" element={<RekapPenjualan />} />
          <Route
            path="/product/:id"
            element={
              <DefaultLayout>
                <ProductDetails />
              </DefaultLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
