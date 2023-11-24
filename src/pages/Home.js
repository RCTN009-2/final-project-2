import React from "react";
import { ProductContext } from "../contexs/ProductContext";
import { useContext } from "react";
import Product from "../components/Product";
import Hero from "../components/Hero.js";

const Home = () => {
  //get products from product contexts
  const { products } = useContext(ProductContext);
  //get only men's and women's category
  const filteredProducts = products.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  });

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id}></Product>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
