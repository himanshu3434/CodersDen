import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { minMaxtype, userNameComponentType } from "@/types/types";
import { useRecoilValue } from "recoil";
import textColorAtom from "@/atoms/textColorAtom";
import { DifferentRatingCompare } from "@/actions/charts/differentRatingCompare";
import ChartType1 from "./skeleton/ChartType1";

export default function MinMaxTable({ user1, user2 }: userNameComponentType) {
  const [allRatings, setAllRatings] = useState<minMaxtype>({
    minRatingUser1: 0,
    minRatingUser2: 0,
    currentRatingUser1: 0,
    currentRatingUser2: 0,
    maxRatingUser1: 0,
    maxRatingUser2: 0,
  });

  const textColor = useRecoilValue(textColorAtom);
  const [loading, setLoading] = useState(true);
  const getRatingData = async () => {
    const ratingData = await DifferentRatingCompare(user1, user2);
    setAllRatings(ratingData);
    setLoading(false);
  };

  useEffect(() => {
    getRatingData();
  }, []);
  return (
    <div>
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500  " />
        <span className="text-xl font-semibold dark:text-slate-500 tracking-wider text-blackLighter">
          Rating
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      {loading == true ? (
        <ChartType1 width={400} height={300} />
      ) : (
        <BarChart
          className="dark:bg-semiblack rounded-xl  "
          xAxis={[{ scaleType: "band", data: ["Min ", "Curr ", "Max "] }]}
          series={[
            {
              label: user1,
              data: [
                allRatings.minRatingUser1,
                allRatings.currentRatingUser1,
                allRatings.maxRatingUser1,
              ],
              color: "#FDAF7B",
            },
            {
              label: user2,

              data: [
                allRatings.minRatingUser2,
                allRatings.currentRatingUser2,
                allRatings.maxRatingUser2,
              ],
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
      )}
    </div>
  );
}
