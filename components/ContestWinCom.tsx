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
      <div>
        <h1 className="text-3xl font-bold text-center mr-11 mb-5">
          Leaderboard
        </h1>
      </div>
      <PieChart
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
        slotProps={{ pieArcLabel: { className: "fill-white font-bold" } }}
        width={400}
        height={200}
      />
    </div>
  );
}

export default ContestWinCom;
