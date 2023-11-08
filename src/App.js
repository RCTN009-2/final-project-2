import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";

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
