import React from "react";

function TableSkeleton({ user1, user2 }: { user1: string; user2: string }) {
  const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="overflow-x-auto rounded-2xl w-full h-[500px] bg-semiblack animate-pulse p-5 min-w-[70vw]">
      <div className=" h-[80px] w-3/4 bg-blackLight rounded-xl mx-auto"></div>
      <div className="space-y-7 mt-11">
        <div className=" h-[30px] w-3/4 bg-blackLight rounded-xl mx-auto mt-3"></div>
        <div className=" h-[30px] w-3/4 bg-blackLight rounded-xl mx-auto mt-3"></div>
        <div className=" h-[30px] w-3/4 bg-blackLight rounded-xl mx-auto mt-3"></div>
        <div className=" h-[30px] w-3/4 bg-blackLight rounded-xl mx-auto mt-3"></div>
        <div className=" h-[30px] w-3/4 bg-blackLight rounded-xl mx-auto mt-3"></div>
        <div className=" h-[30px] w-3/4 bg-blackLight rounded-xl mx-auto mt-3"></div>
      </div>
    </div>
  );
}

export default TableSkeleton;
