import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { tagProblemType, typesQuestionSolvedObjType } from "@/types/types";

const chartSetting = {
  width: 5000,
  height: 600,
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
    <div className=" relative overflow-scroll  w-[30rem] h-[40rem]">
      <div className="absolute   ">
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "tagName" }]}
          series={[
            { dataKey: "user1", label: user1, valueFormatter },
            { dataKey: "user2", label: user2, valueFormatter },
          ]}
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",

            overflow: "hidden",
            overflowX: "scroll",
            // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
          }}
          layout="vertical"
          borderRadius={100}
          {...chartSetting}
          grid={{ vertical: true }}
        />
      </div>
    </div>
  );
}
