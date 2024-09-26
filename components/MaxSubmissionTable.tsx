import { MaxSubmissionDataObjType } from "@/types/types";
import { axisClasses, BarChart, barElementClasses } from "@mui/x-charts";
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
      <div className="flex items-center my-8">
        <hr className="flex-grow border-t-2 border-semiblack mr-4 " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Max Submission
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <BarChart
        className="dark:bg-semiblack"
        xAxis={[{ scaleType: "band", data: ["Day", "Week ", "Month "] }]}
        series={[
          {
            label: user1,
            data: [
              maxSubmissionDataObj.user1MaxSubmissionsDay,
              maxSubmissionDataObj.user1MaxSubmissionsWeek,
              maxSubmissionDataObj.user1MaxSubmissionsMonth,
            ],
          },
          {
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
        slotProps={{
          barLabel: {
            style: { fill: "white" },
          },
        }}
      />
    </div>
  );
}

export default MaxSubmissionTable;
