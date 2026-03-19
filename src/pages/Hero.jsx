import { useState } from "react";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const slides = [
  {
    image: back1,
    title: "Discover the Best of Bold Fashion",
    subtitle: "Limited Time Only!"
  },
  {
    image: back2,
    title: "New Collection Arrived",
    subtitle: "Shop Now"
  },
  {
    image: back3,
    title: "Trending Styles",
    subtitle: "Upgrade Your Look"
  },
  {
    image: back4,
    title: "Exclusive Offers",
    subtitle: "Don't Miss Out"
  }
];





function Hero() {

const location = useLocation();




  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src={slides[current].image}
        alt="slide"
        className="w-full h-full object-cover"
      />

      {/* Text Section */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2 text-white">
        <h1 className="text-5xl font-bold mb-4">
          {slides[current].title}
        </h1>
        <p className="text-2xl">
          {slides[current].subtitle}
        </p>
      </div>

      {/* Dots */}
      <div className="absolute left-10 bottom-20 flex flex-col gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              current === index
                ? "bg-red-500 scale-125"
                : "bg-white"
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
}

export default Hero;