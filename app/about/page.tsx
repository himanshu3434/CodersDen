import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen  ">
      <div className="text-black dark:text-white text-center font-semibold   tracking-wide  font-sans transition-colors duration-300">
        <h1 className="text-5xl md:text-6xl  leading-tight">
          *Compiled an{" "}
          <span className="text-purple-600 italic text-purple tracking-wide">
            Idea
          </span>
        </h1>
        <h1 className="text-5xl md:text-6xl  leading-tight mt-4">
          in Search of{" "}
          <span className="text-purple italic tracking-wide">Bigger</span>{" "}
          picture.
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-8 text-center max-w-2xl">
        Stay Tuned Coders more featured are coming soon.
      </p>

      <div className="mt-16 dark:text-gray-400 text-gray-500">
        ~ Developed by{" "}
        <Link href="https://shashankbhatnagar.vercel.app/" target="_blank">
          <span className="text-purple-600 underline">Shashank</span>
        </Link>
        <span className="text-purple-600"> & </span>
        <Link href="https://himanshuyadav.vercel.app/" target="_blank">
          <span className="text-purple-600 underline">Himanshu </span>
        </Link>{" "}
        ~
      </div>
    </div>
  );
};

export default About;
