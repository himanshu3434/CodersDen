import { AllSubmissionDataType } from "@/types/types";
import { BarChart } from "@mui/x-charts";
import React from "react";

function StreakSubmissionTable({
  user1,
  user2,
  allSubmissionDetails,
}: {
  user1: string;
  user2: string;
  allSubmissionDetails: AllSubmissionDataType;
}) {
  return (
    <div className="ml-7">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Max Streak
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
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
      />
    </div>
  );
}

export default StreakSubmissionTable;
