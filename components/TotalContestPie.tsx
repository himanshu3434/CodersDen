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
      <div>
        <h1 className="text-3xl font-bold text-center mr-11 mb-5">
          Total Contest
        </h1>
      </div>
      <PieChart
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
          },
        }}
        width={400}
        height={200}
      />
    </div>
  );
}

export default TotalContestPie;
