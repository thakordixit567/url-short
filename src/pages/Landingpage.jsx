import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="  flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
  <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
    The only URL Shortener <br /> you&rsquo;ll ever need! 👇
  </h2>

  <form
    onSubmit={handleShorten}
    className=" font-grotesk sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
  >
    <Input
      type="url"
      placeholder="Enter your loooong URL"
      value={longUrl}
      onChange={(e) => setLongUrl(e.target.value)}
      className="h-full flex-1 py-4 px-4"
    />
    <Button type="submit" className="h-full" variant="destructive">
      Shorten!
    </Button>
  </form>

  <div className="py-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6">
  <img
    src="/banner1.png"
    className="w-72 sm:w-80 md:w-96 my-4 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
    alt="Banner1"
  />

  <img
    src="/banner1.png"
    className="w-72 sm:w-80 md:w-96 my-4 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
    alt="Banner2"
  />
</div>


  <Accordion type="multiple" collapsible className="w-full font-grotesk ">
    <AccordionItem value="item-1">
      <AccordionTrigger>
        How does the QuickTrimm URL shortener works?
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
        Yes. Creating an account allows you to manage your URLs, view analytics,
        and customize your short URLs.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>
        What analytics are available for my shortened URLs?
      </AccordionTrigger>
      <AccordionContent>
        You can view the number of clicks, geolocation data of the clicks and
        device types (mobile/desktop) for each of your shortened URLs.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

  );
};

export default LandingPage;