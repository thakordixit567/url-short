import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Landingpage = () => {
  return (
    <div className=" flex flex-col items-center">
      <h2 className=" font-slackey  my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form className=" sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 ">
        <Input
          type="url"
          placeholder="Enter you looong URL !"
          className=" font-grotesk h-full flex-1 py-4 px-4 font-semibold "
        />
        <Button className=" font-grotesk h-full font-semibold" type="submit" variant="destructive">
          Shorten
        </Button>
        
      </form>
      <img
      src="/banner1.png" // replace with 2 in small screens
      className="w-full my-11 md:px-11"
    />
    </div>
  );
};

export default Landingpage;
