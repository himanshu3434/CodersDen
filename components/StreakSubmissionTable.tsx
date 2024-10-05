import textColorAtom from "@/atoms/textColorAtom";
import { AllSubmissionDataType } from "@/types/types";
import { BarChart } from "@mui/x-charts";
import React from "react";
import { useRecoilValue } from "recoil";

function StreakSubmissionTable({
  user1,
  user2,
  allSubmissionDetails,
}: {
  user1: string;
  user2: string;
  allSubmissionDetails: AllSubmissionDataType;
}) {
  const textColor = useRecoilValue(textColorAtom);
  return (
    <div className="ml-7 ">
      <div className="flex items-center my-2 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4  border-gray-500 " />
        <span className="text-lg font-semibold dark:text-slate-500 text-blackLighter">
          Max Streak
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl mt-6"
        xAxis={[
          {
            scaleType: "band",
            data: ["Max\nStreak", "Total\nActiveDays", "Total\nSubmission"],
          },
        ]}
        series={[
          {
            label: user1,
            data: [
              allSubmissionDetails.streakUser1,
              allSubmissionDetails.totalActiveDaysUser1,
              allSubmissionDetails.totalSubmissionsUser1,
            ],
            color: "#FDAF7B",
          },
          {
            label: user2,

            data: [
              allSubmissionDetails.streakUser2,
              allSubmissionDetails.totalActiveDaysUser2,
              allSubmissionDetails.totalSubmissionsUser2,
            ],
            color: "#D4ADFC",
          },
        ]}
        width={400}
        height={300}
        borderRadius={18}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: "14px",
              fill: textColor,
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

export default StreakSubmissionTable;
