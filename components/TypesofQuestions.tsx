import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  tagProblemType,
  typesQuestionSolvedObjType,
  userNameComponentType,
} from "@/types/types";
import { useRecoilValue } from "recoil";
import textColorAtom from "@/atoms/textColorAtom";
import { TypesQuestionSolved } from "@/actions/charts/typesofquestion";
import ChartType1 from "./skeleton/ChartType1";
type dataSetType = {
  tagName: string;
  user1: number;
  user2: number;
};
const chartSetting = {
  width: 3320,
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
}: userNameComponentType) {
  const [loading, setLoading] = React.useState(true);
  const [dataSet, setDataSet] = React.useState<dataSetType[]>([]);
  const textColor = useRecoilValue(textColorAtom);

  const getTypesQuestionSolvedData = async () => {
    const typesQuestionSolvedObj = (await TypesQuestionSolved(
      user1,
      user2
    )) as typesQuestionSolvedObjType;

    const dataSetArray = mergeTagsAndPrepareDataset(
      typesQuestionSolvedObj.tagProblemUser1,
      typesQuestionSolvedObj.tagProblemUser2
    );
    setDataSet(dataSetArray);
    setLoading(false);
  };
  React.useEffect(() => {
    getTypesQuestionSolvedData();
  }, []);
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
          {loading == true ? (
            <ChartType1 width={3320} height={600} />
          ) : (
            <BarChart
              className="dark:bg-semiblack rounded-xl  mb-1"
              dataset={dataSet}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "tagName",
                  valueFormatter: (value: string) => {
                    return value.split(/[\s-]+/).join("\n");
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
          )}
        </div>
      </div>
    </div>
  );
}
