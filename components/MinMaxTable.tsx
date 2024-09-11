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
    <BarChart
      xAxis={[{ scaleType: "band", data: ["Min ", "Curr ", "Max "] }]}
      series={[
        {
          label: user1,
          data: [minRatingUser1, currentRatingUser1, maxRatingUser1],
        },
        {
          label: user2,

          data: [minRatingUser2, currentRatingUser2, maxRatingUser2],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
