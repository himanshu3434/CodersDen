import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { minMaxTablePropsType } from "@/types/types";

export default function MinMaxTable({
  user1,
  user2,
  allRatings,
}: minMaxTablePropsType) {
  const minRatingUser1 = allRatings.minRatingUser1;
  const minRatingUser2 = allRatings.minRatingUser2;
  const currentRatingUser1 = allRatings.currentRatingUser1;
  const currentRatingUser2 = allRatings.currentRatingUser2;
  const maxRatingUser1 = allRatings.maxRatingUser1;
  const maxRatingUser2 = allRatings.maxRatingUser2;
  return (
    <div>
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Rating
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
        xAxis={[{ scaleType: "band", data: ["Min ", "Curr ", "Max "] }]}
        series={[
          {
            label: user1,
            data: [minRatingUser1, currentRatingUser1, maxRatingUser1],
            color: "#FDAF7B",
          },
          {
            label: user2,

            data: [minRatingUser2, currentRatingUser2, maxRatingUser2],
            color: "#D4ADFC",
          },
        ]}
        width={500}
        height={300}
        borderRadius={18}
      />
    </div>
  );
}
