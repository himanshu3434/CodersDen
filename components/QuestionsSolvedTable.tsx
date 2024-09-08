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
    <BarChart
      xAxis={[{ scaleType: "band", data: ["Easy ", "Medium ", "Hard "] }]}
      series={[
        {
          id: user1,
          label: user1,
          data: [easySolvedUser1, mediumSolvedUser1, hardSolvedUser1],
        },
        {
          id: user2,
          label: user2,
          data: [easySolvedUser2, mediumSolvedUser2, hardSolvedUser2],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
