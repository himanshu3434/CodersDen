import React from "react";

function PieChartType() {
  return (
    <div className=" py-5 dark:bg-semiblack bg-gray-100  rounded-xl  mt-6 animate-pulse">
      <div className={`w-[400px]  h-[280px] `}>
        <div className="flex justify-center space-x-3  ">
          <div className="w-[130px] h-[30px] dark:bg-blackLight rounded-xl mt-3 bg-gray-200 animate-pulse"></div>
          <div className="w-[130px] h-[30px] dark:bg-blackLight rounded-xl mt-3 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="mt-8 mx-auto w-1/2  h-[200px] rounded-full dark:bg-blackLight bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}

export default PieChartType;
