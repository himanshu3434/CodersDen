import { TotalContest } from "@/actions/charts/totalContest";
import textColorAtom from "@/atoms/textColorAtom";
import { userNameComponentType } from "@/types/types";
import { PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PieChartType from "./skeleton/PieChartType";

function TotalContestPie({ user1, user2 }: userNameComponentType) {
  const textColor = useRecoilValue(textColorAtom);
  const [totalContestUser1Data, setTotalContestUser1Data] = useState(0);
  const [totalContestUser2Data, setTotalContestUser2Data] = useState(0);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const tableData = await TotalContest(user1, user2);
    setTotalContestUser1Data(tableData.totalContestUser1);
    setTotalContestUser2Data(tableData.totalContestUser2);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="my-4">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4  border-gray-500 " />
        <span className="text-xl font-semibold dark:text-slate-500 tracking-wider text-blackLighter">
          Total Contest
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      {loading == true ? (
        <PieChartType />
      ) : totalContestUser1Data || totalContestUser2Data ? (
        <div className="dark:bg-semiblack  pt-5 pb-5 rounded-xl">
          <PieChart
            colors={["#D4ADFC", "#FDAF7B"]} // Use palette
            margin={{ top: 40, left: 90 }}
            series={[
              {
                data: [
                  {
                    id: 1,
                    value: totalContestUser2Data,
                    label: user2,
                  },
                  {
                    id: 0,
                    value: totalContestUser1Data,
                    label: user1,
                  },
                ],
                arcLabel: (params) => {
                  return params.value == 0 ? "" : params.value + "";
                },
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={400}
            height={280}
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
          />
        </div>
      ) : (
        <div className="dark:bg-semiblack pt-5 pb-5 rounded-xl flex justify-center items-center h-72 w-96">
          <p className="text-center text-gray-500 dark:text-gray-300 font-semibold">
            Not enough data to Compare
          </p>
        </div>
      )}
    </div>
  );
}

export default TotalContestPie;
