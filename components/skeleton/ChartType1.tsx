import React from "react";

function ChartType1({ width, height }: { width: number; height: number }) {
  return (
    <div>
      <div
        className={`w-[${width}px]  h-[${height}px] dark:bg-semiblack rounded-xl  mt-6 animate-pulse`}
      >
        <div className="flex justify-center space-x-3 animate-pulse ">
          <div className="w-[80px] h-[30px] bg-blackLight rounded-xl mt-3 animate-pulse"></div>
          <div className="w-[80px] h-[30px] bg-blackLight rounded-xl mt-3 animate-pulse"></div>
        </div>
        <div className="w-3/4  h-[200px] flex items-end mx-auto mt-8 px-2 justify-between border-l-2 border-b-2 border-gray-400 border-opacity-10">
          <div className="flex items-end space-x-1">
            <div className="w-[35px] h-[100px] bg-blackLight rounded-t-2xl animate-pulse "></div>
            <div className="w-[35px] h-[110px] bg-blackLight rounded-t-2xl  animate-pulse"></div>
          </div>
          <div className="flex items-end space-x-1">
            <div className="w-[35px] h-[120px] bg-blackLight rounded-t-2xl animate-pulse "></div>
            <div className="w-[35px] h-[130px] bg-blackLight rounded-t-2xl  animate-pulse"></div>
          </div>

          <div className="flex items-end space-x-1">
            <div className="w-[35px] h-[130px] bg-blackLight rounded-t-2xl animate-pulse"></div>
            <div className="w-[35px] h-[180px] bg-blackLight rounded-t-2xl animate-pulse "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartType1;
