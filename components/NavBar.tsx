"use client";
import useMode from "@/hooks/useMode";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

function NavBar() {
  const router = useRouter();
  const handleCompareClick = () => {
    router.push("/");
  };
  const handleAboutClick = () => {
    router.push("/about");
  };
  const { mode, toggleMode } = useMode();

  return (
    <div className=" shadow-sm shadow-semiblack dark:shadow-white ">
      <div className="flex justify-between h-16  max-w-[70vw] mx-auto  ">
        <div className="max-w-[50vw] w-full flex items-center">
          <h1 className="font-bold text-red-500 text-xl ">CodersDen</h1>
        </div>

        <div className="max-w-[50vw] w-full  flex justify-end  pr-7 dark:text-white">
          <button onClick={toggleMode} className=" px-3 rounded-b-lg  ">
            {mode === "dark" ? <IoSunny /> : <IoMoon />}
          </button>
          <button
            onClick={handleCompareClick}
            className="hover:bg-red-400 px-3 rounded-b-lg hover:text-white"
          >
            Compare
          </button>
          <button
            onClick={handleAboutClick}
            className="hover:bg-red-400 px-3 rounded-b-lg hover:text-white "
          >
            About
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
