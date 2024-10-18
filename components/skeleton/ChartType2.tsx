import React from "react";

function ChartType2() {
  return (
    <div>
      <div
        className={`w-[1000px]  h-[300px] dark:bg-semiblack rounded-xl  mt-6 animate-pulse`}
      >
        <div className="flex justify-center space-x-3 animate-pulse ">
          <div className="w-[130px] h-[30px] bg-blackLight rounded-xl mt-3 animate-pulse"></div>
          <div className="w-[130px] h-[30px] bg-blackLight rounded-xl mt-3 animate-pulse"></div>
        </div>
        <div className="w-3/4  h-[200px] flex items-center justify-center mx-auto mt-8 px-2  border-l-2 border-b-2 border-gray-400 border-opacity-10 ">
          <div className="w-[90%] h-[100px] bg-blackLight rounded-xl animate-pulse "></div>
        </div>
      </div>
    </div>
  );
}

export default ChartType2;
