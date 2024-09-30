import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  minMaxTablePropsType,
  questionSolvedTableObjType,
} from "@/types/types";

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

  return (
    <div className="mr-8">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 border-semiblack mr-4  " />
        <span className="text-xl font-semibold dark:text-slate-500">
          Questions
        </span>
        <hr className="flex-grow border-t-2 border-semiblack ml-4" />
      </div>
      <BarChart
        className="dark:bg-semiblack rounded-xl dark:stroke-gray-300 dark:stroke-1"
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
      />
    </div>
  );
}
