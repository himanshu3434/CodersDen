import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { minMaxTablePropsType } from "@/types/types";
import { useRecoilValue } from "recoil";
import textColorAtom from "@/atoms/textColorAtom";

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
  const textColor = useRecoilValue(textColorAtom);
  return (
    <div>
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500  " />
        <span className="text-xl font-semibold dark:text-slate-500 tracking-wider text-blackLighter">
          Rating
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl  "
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
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: "14px",
              fill: textColor, // Change the label color here
            },
          },
          axisLine: {
            style: {
              stroke: textColor,
            },
          },
          axisTick: {
            style: {
              stroke: textColor,
            },
          },
          axisTickLabel: {
            style: {
              fill: textColor,
              fontSize: "14px",
            },
          },
        }}
        highlightedItem={null}
      />
    </div>
  );
}
