import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React from "react";

function TotalContestPie({
  user1,
  user2,
  totalContestUser1,
  totalContestUser2,
}: {
  user1: string;
  user2: string;
  totalContestUser1: number;
  totalContestUser2: number;
}) {
  return (
    <div className="my-4">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Total Contest
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <PieChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
        colors={["#D4ADFC", "#FDAF7B"]} // Use palette
        series={[
          {
            data: [
              { id: 1, value: totalContestUser2, label: user2 },
              { id: 0, value: totalContestUser1, label: user1 },
            ],
            arcLabel: (params) => params.value + "" ?? "",
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: "white",
            stroke: "transparent",
          },
        }}
        width={400}
        height={200}
      />
    </div>
  );
}

export default TotalContestPie;
