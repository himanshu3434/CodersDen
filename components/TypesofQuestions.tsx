import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { tagProblemType, typesQuestionSolvedObjType } from "@/types/types";

const chartSetting = {
  xAxis: [
    {
      label: "Problems Solved",
    },
  ],
  width: 600,
  height: 2000,
};
const valueFormatter = (value: number | null) => `${value}`;

function mergeTagsAndPrepareDataset(
  user1Data: tagProblemType[],
  user2Data: tagProblemType[]
) {
  const tagMap: { [tagName: string]: { user1: number; user2: number } } = {};

  user1Data.forEach((tag) => {
    tagMap[tag.tagName] = { user1: tag.problemsSolved, user2: 0 };
  });

  user2Data.forEach((tag) => {
    if (tagMap[tag.tagName]) {
      tagMap[tag.tagName].user2 = tag.problemsSolved;
    } else {
      tagMap[tag.tagName] = { user1: 0, user2: tag.problemsSolved };
    }
  });

  const dataset = Object.keys(tagMap)
    .map((tagName) => ({
      tagName,
      user1: tagMap[tagName].user1,
      user2: tagMap[tagName].user2,
    }))
    .sort((a, b) => {
      // Sort based on the sum of problems solved by both users
      const sumA = a.user1 + a.user2;
      const sumB = b.user1 + b.user2;
      return sumB - sumA; // Descending order
    });

  return dataset;
}

export default function TypesofQuestions({
  user1,
  user2,
  tagProblemUser1,
  tagProblemUser2,
}: typesQuestionSolvedObjType) {
  const dataset = mergeTagsAndPrepareDataset(tagProblemUser1, tagProblemUser2);

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "tagName" }]}
      series={[
        { dataKey: "user1", label: user1, valueFormatter },
        { dataKey: "user2", label: user2, valueFormatter },
      ]}
      layout="horizontal"
      borderRadius={100}
      {...chartSetting}
      grid={{ horizontal: true }}
    />
  );
}
