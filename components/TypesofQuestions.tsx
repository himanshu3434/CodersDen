import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { tagProblemType, typesQuestionSolvedObjType } from "@/types/types";
import { useRecoilValue } from "recoil";
import textColorAtom from "@/atoms/textColorAtom";

const chartSetting = {
  width: 3000,
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
  const textColor = useRecoilValue(textColorAtom);
  return (
    <div>
      <h1>
        <h1 className="text-3xl font-bold dark:text-purple text-center mt-20 tracking-wide font-mono text-blackLighter">
          Type of Questions{" "}
        </h1>
        <hr className="w-[70vw] mx-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-5 border-0" />
      </h1>

      <div className=" relative overflow-scroll overflow-y-auto w-[64rem] h-auto scrollbar">
        <div className="">
          <BarChart
            className="dark:bg-semiblack rounded-xl  mb-1"
            dataset={dataset}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "tagName",
                valueFormatter: (value: string) => {
                  return value.split(/[\s-]+/).join("\n");
                },
                tickLabelStyle: {
                  fontSize: 11,
                  width: 1,
                  padding: 2,
                },
              },
            ]}
            series={[
              {
                dataKey: "user1",
                label: user1,
                valueFormatter,
                color: "#FDAF7B",
                // FDAF7B   FFB38E
              },
              {
                dataKey: "user2",
                label: user2,
                valueFormatter,
                color: "#D4ADFC",
                // DFCCFB  D0BFFF D4ADFC   BEADFA
              },
            ]}
            layout="vertical"
            borderRadius={15}
            {...chartSetting}
            grid={{ vertical: true }}
            highlightedItem={null}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: "14px",
                  fill: textColor,
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
                  fontSize: "11px",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
