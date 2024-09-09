import { MaxSubmissionDataObjType } from "@/types/types";
import { BarChart } from "@mui/x-charts";
import React from "react";

function MaxSubmissionTable({
  maxSubmissionDataObj,
  user1,
  user2,
}: {
  maxSubmissionDataObj: MaxSubmissionDataObjType;
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
              maxSubmissionDataObj.user1MaxSubmissionsDay,
              maxSubmissionDataObj.user1MaxSubmissionsWeek,
              maxSubmissionDataObj.user1MaxSubmissionsMonth,
            ],
          },
          {
            id: user2,
            label: user2,

            data: [
              maxSubmissionDataObj.user2MaxSubmissionsDay,
              maxSubmissionDataObj.user2MaxSubmissionsWeek,
              maxSubmissionDataObj.user2MaxSubmissionsMonth,
            ],
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
}

export default MaxSubmissionTable;
