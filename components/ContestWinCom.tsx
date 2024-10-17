import { ContestWinCompare } from "@/actions/charts/contestWinCompare";
import textColorAtom from "@/atoms/textColorAtom";
import { userNameComponentType } from "@/types/types";
import { PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

function ContestWinCom({ user1, user2 }: userNameComponentType) {
  const textColor = useRecoilValue(textColorAtom);
  const [user1WinData, setUser1WinData] = useState(0);
  const [user2WinData, setUser2WinData] = useState(0);
  const getWinData = async () => {
    const windata = (await ContestWinCompare(user1, user2)) as {
      user1Win: number;
      user2Win: number;
    };
    setUser1WinData(windata.user1Win);
    setUser2WinData(windata.user2Win);
  };

  useEffect(() => {
    getWinData();
  }, []);
  return (
    <div className="my-4">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4  border-gray-500 " />
        <span className="text-xl font-semibold dark:text-slate-500 tracking-wider text-blackLighter">
          A <i className="text-red-300  ">vs</i> B{" "}
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      <div className="dark:bg-semiblack  pt-5 pb-5 rounded-xl">
        <PieChart
          margin={{ top: 40, left: 90 }}
          colors={["#D4ADFC", "#FDAF7B"]} // Use palette
          series={[
            {
              data: [
                { id: 1, value: user2WinData, label: user2 },
                { id: 0, value: user1WinData, label: user1 },
              ],
              arcLabel: (params) => {
                return params.value == 0 ? "" : params.value + " wins";
              },
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          slotProps={{
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
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
              padding: 0,
              labelStyle: {
                fontSize: "14px",
                fill: textColor,
              },
            },
            pieArcLabel: {
              style: {
                fill: "#ffffff",
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
          }}
          width={400}
          height={280}
        />
      </div>
    </div>
  );
}

export default ContestWinCom;
