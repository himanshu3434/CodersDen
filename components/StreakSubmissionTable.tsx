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
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [" Max Streak", "TotalActiveDays ", "Total Submission "],
          },
        ]}
        series={[
          {
            id: user1,
            label: user1,
            data: [
              allSubmissionDetails.streakUser1,
              allSubmissionDetails.totalActiveDaysUser1,
              allSubmissionDetails.totalSubmissionsUser1,
            ],
          },
          {
            id: user2,
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
