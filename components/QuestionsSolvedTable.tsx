import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  minMaxTablePropsType,
  questionSolvedTableObjType,
} from "@/types/types";
import textColorAtom from "@/atoms/textColorAtom";
import { useRecoilValue } from "recoil";

export default function QuestionsSolvedTable({
  user1,
  user2,
  allSolvedQuestions,
}: questionSolvedTableObjType) {
  const easySolvedUser1 = allSolvedQuestions.easySolvedUser1;
  const easySolvedUser2 = allSolvedQuestions.easySolvedUser2;
  const mediumSolvedUser1 = allSolvedQuestions.mediumSolvedUser1;
  const mediumSolvedUser2 = allSolvedQuestions.mediumSolvedUser2;
  const hardSolvedUser1 = allSolvedQuestions.hardSolvedUser1;
  const hardSolvedUser2 = allSolvedQuestions.hardSolvedUser2;
  const textColor = useRecoilValue(textColorAtom);
  return (
    <div className="mr-8">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500  " />
        <span className="text-lg font-semibold dark:text-slate-500 text-blackLighter">
          Questions
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl "
        xAxis={[{ scaleType: "band", data: ["Easy ", "Medium ", "Hard "] }]}
        series={[
          {
            label: user1,
            data: [easySolvedUser1, mediumSolvedUser1, hardSolvedUser1],
            color: "#FDAF7B",
          },
          {
            label: user2,
            data: [easySolvedUser2, mediumSolvedUser2, hardSolvedUser2],
            color: "#D4ADFC",
          },
        ]}
        width={400}
        height={300}
        borderRadius={18}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: "14px",
              fill: textColor, // Change the label color here
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
