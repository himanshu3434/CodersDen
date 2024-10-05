import textColorAtom from "@/atoms/textColorAtom";
import { MaxSubmissionDataObjType } from "@/types/types";
import { BarChart } from "@mui/x-charts";
import { useRecoilValue } from "recoil";

function MaxSubmissionTable({
  maxSubmissionDataObj,
  user1,
  user2,
}: {
  maxSubmissionDataObj: MaxSubmissionDataObjType;
  user1: string;
  user2: string;
}) {
  const textColor = useRecoilValue(textColorAtom);
  return (
    <div>
      <div className="flex items-center my-2">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4  border-gray-500   " />
        <span className="text-lg font-semibold dark:text-slate-500  text-blackLighter">
          Max Submission
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500" />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl  mt-6"
        xAxis={[{ scaleType: "band", data: ["Day", "Week ", "Month "] }]}
        series={[
          {
            label: user1,

            data: [
              maxSubmissionDataObj.user1MaxSubmissionsDay,
              maxSubmissionDataObj.user1MaxSubmissionsWeek,
              maxSubmissionDataObj.user1MaxSubmissionsMonth,
            ],
            color: "#FDAF7B",
          },
          {
            label: user2,

            data: [
              maxSubmissionDataObj.user2MaxSubmissionsDay,
              maxSubmissionDataObj.user2MaxSubmissionsWeek,
              maxSubmissionDataObj.user2MaxSubmissionsMonth,
            ],
            color: "#D4ADFC",
          },
        ]}
        borderRadius={18}
        width={400}
        height={300}
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

export default MaxSubmissionTable;
