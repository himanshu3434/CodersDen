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
    <div className="my-7">
      <div>
        <h1 className="font-bold text-xl pl-20 ">Total contest </h1>
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
