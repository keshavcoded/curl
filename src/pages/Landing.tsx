import Feature from "@/components/Feature";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart2,
  Edit3,
  Link,
  QrCode,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const features = [
  {
    title: "Short & Simple Links",
    description:
      "Transform bulky URLs into concise, memorable links instantly for easier sharing and better engagement.",
    icon: Link,
    color: "text-blue-500",
  },
  {
    title: "Custom URL Slugs",
    description:
      "Personalize the end of every short link to match your brand or campaign, improving trust and click rates.",
    icon: Edit3,
    color: "text-yellow-500",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Monitor your link performance with click tracking, geographical insights, and device breakdown in intuitive dashboards.",
    icon: BarChart2,
    color: "text-green-500",
  },
  {
    title: "QR Code Generator",
    description:
      "Automatically create dynamic QR codes for any shortened link—perfect for offline and multi-channel marketing.",
    icon: QrCode,
    color: "text-purple-500",
  },
  {
    title: "Secure & Private",
    description:
      "Modern encryption, link expiration, and password protection keep your links safe and your data private.",
    icon: ShieldCheck,
    color: "text-red-500",
  },
  {
    title: "One-Click Social Sharing",
    description:
      "Share your new link directly to popular social channels with a single click, streamlining your content distribution.",
    icon: Share2,
    color: "text-indigo-500",
  },
];

const Landing = () => {
  const [inputUrl, setInputUrl] = useState<string>();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputUrl) navigate(`/auth/login?createLink=${inputUrl}`);
  }

  return (
    <div className="m-10 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-10 sm:my-16 text-3xl sm:text-4xl lg:text-5xl text-center font-bold"
      >
        Shorten, Share, and Track Your Links Effortlessly.
      </motion.h2>
      <form
        action="submit"
        className="flex flex-col sm:h-12 sm:flex-row w-full md:w-2/4 gap-2 "
        onSubmit={handleSubmit}
      >
        <Input
          type="url"
          placeholder="Enter your URL"
          className="h-full flex-1 py-2 sm:py-4 px-2 sm:px-4"
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <Button className="h-full py-2 sm:py-4 px-2 sm:px-4 cursor-pointer ">
          Convert
        </Button>
      </form>

      <div className="max-w-6xl m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full select-none">
        {features.map((feature, index) => {
          return <Feature key={index} {...feature} />;
        })}
      </div>
      <Accordion
        type="single"
        collapsible
        className="mt-10 w-full md:px-11 max-w-6xl"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm sm:text-base">
            How does our URL shortener simplify links?
          </AccordionTrigger>
          <AccordionContent>
            Our app converts your long, complex URLs into neat, short links
            instantly, making sharing across social media or emails cleaner and
            easier for your audience to remember and click.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm sm:text-base">
            What insights do link analytics provide?
          </AccordionTrigger>
          <AccordionContent>
            You get real-time data on each link’s clicks, including where your
            visitors are from, their devices, and when they clicked, all
            accessible via a sleek dashboard to optimize your outreach.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm sm:text-base">
            Can I brand and customize my short URLs?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely! Customize the tail end of every shortened link with your
            own keywords or branded slugs to reinforce your identity and boost
            trust and engagement with your audience.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-sm sm:text-base">
            Is My Data Safe?
          </AccordionTrigger>
          <AccordionContent>
            We prioritize security by using HTTPS encryption, link expiration,
            and optional password protection to ensure your data and your
            visitors' privacy are well-protected.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
