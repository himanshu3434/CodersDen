import { MaxSubmissionDataObjType } from "@/types/types";
import { BarChart } from "@mui/x-charts";
import React from "react";

function MaxSubmissionTable({
  allSubmissionDetails,
  user1,
  user2,
}: {
  allSubmissionDetails: MaxSubmissionDataObjType;
  user1: string;
  user2: string;
}) {
  return (
    <div>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Day", "Week ", "Month "] }]}
        series={[
          {
            id: user1,
            label: user1,
            data: [
              allSubmissionDetails.user1MaxSubmissionsDay,
              allSubmissionDetails.user1MaxSubmissionsWeek,
              allSubmissionDetails.user1MaxSubmissionsMonth,
            ],
          },
          {
            id: user2,
            label: user2,

            data: [
              allSubmissionDetails.user2MaxSubmissionsDay,
              allSubmissionDetails.user2MaxSubmissionsWeek,
              allSubmissionDetails.user2MaxSubmissionsMonth,
            ],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}

export default MaxSubmissionTable;
