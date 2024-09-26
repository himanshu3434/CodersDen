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
    <div>
      <div className="flex items-center my-8 w-[50vw]">
        <hr className="flex-grow border-t-2 border-semiblack mr-4 " />
        <span className="text-xl font-semibold dark:text-slate-500">
          General
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [" Max Streak", "TotalActiveDays ", "Total Submission "],
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
          },
          {
            label: user2,

            data: [
              allSubmissionDetails.streakUser2,
              allSubmissionDetails.totalActiveDaysUser2,
              allSubmissionDetails.totalSubmissionsUser2,
            ],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}

export default StreakSubmissionTable;
