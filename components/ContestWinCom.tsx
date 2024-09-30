import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React from "react";

function ContestWinCom({
  user1,
  user2,
  user1Win,
  user2Win,
}: {
  user1: string;
  user2: string;
  user1Win: number;
  user2Win: number;
}) {
  return (
    <div className="my-4">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          A vs.B <span className="text-red-500 dark:text-purple">Wins</span>
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <PieChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
        colors={["#D4ADFC", "#FDAF7B"]} // Use palette
        series={[
          {
            data: [
              { id: 1, value: user2Win, label: user2 },
              { id: 0, value: user1Win, label: user1 },
            ],
            arcLabel: (params) => params.value + " wins" ?? "",
          },
        ]}
        slotProps={{
          pieArcLabel: { className: "fill-white font-bold stroke-transparent" },
        }}
        width={400}
        height={200}
      />
    </div>
  );
}

export default ContestWinCom;
