import React from "react";

function NavBar() {
  return (
    <div className=" shadow-md shadow-blue-300">
      <div className="flex justify-between h-16  max-w-[70vw] mx-auto  ">
        <div className="max-w-[50vw] w-full flex items-center">
          <h1 className="font-bold text-red-500 text-xl">CodersDen</h1>
        </div>

        <div className="max-w-[50vw] w-full  flex justify-end  pr-7">
          <button className="hover:bg-red-400 px-3 rounded-b-lg hover:text-white">
            Compare
          </button>
          <button className="hover:bg-red-400 px-3 rounded-b-lg hover:text-white ">
            About
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
