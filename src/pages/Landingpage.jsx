import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const [longUrl, setLongUrl] = useState();
  const naviagte = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) naviagte(`/auth?createNew=${longUrl}`);
  };
  return (
    <div className=" flex flex-col items-center">
      <h2 className=" font-slackey  my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>

      <form
        onSubmit={handleShorten}
        className=" sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 "
      >
        <Input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter you looong URL !"
          className="  font-grotesk h-full flex-1 py-4 px-4 font-semibold "
        />
        <Button
          className=" font-grotesk h-full font-semibold"
          type="submit"
          variant="destructive"
        >
          Shorten
        </Button>
      </form>
      <div className="flex justify-center">
        <div className="relative m-12 inline-block p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-border">
          <img
            src="/banner.jpg"
            className="w-full max-w-5xl my-16 md:px-16 rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
            alt="Banner"
          />
        </div>
      </div>
      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Trimrr URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landingpage;
