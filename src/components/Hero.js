import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex justify-between h-full">
        {/*text */}
        <div className="flex flex-col justify-center">
          {/*pretitle */}
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500"></div>New Trend
          </div>
          <div className="flex">
            <h1 className="text-[70px] leading-[1.1] font-light mb-4">
              AUTUMN SALE
              <br />
              <span className="font-semibold ml-0">STYLISH</span>
            </h1>
          </div>

          <Link
            to={"/"}
            className="self-start uppercase font-semibold border-b-2 border-primary"
          >
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;