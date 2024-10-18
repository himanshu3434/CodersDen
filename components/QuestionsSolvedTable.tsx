import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { allQuestionsSolvedType, userNameComponentType } from "@/types/types";
import textColorAtom from "@/atoms/textColorAtom";
import { useRecoilValue } from "recoil";
import { QuestionSolved } from "@/actions/charts/questionSolved";
import ChartType1 from "./skeleton/ChartType1";

export default function QuestionsSolvedTable({
  user1,
  user2,
}: userNameComponentType) {
  const [allSolvedQuestions, setAllSolvedQuestions] =
    useState<allQuestionsSolvedType>({
      easySolvedUser1: 0,
      easySolvedUser2: 0,
      mediumSolvedUser1: 0,
      mediumSolvedUser2: 0,
      hardSolvedUser1: 0,
      hardSolvedUser2: 0,
    });
  const [loading, setLoading] = useState(true);
  const getQuestionSolvedData = async () => {
    const questionSolvedTableObj = await QuestionSolved(user1, user2);
    setAllSolvedQuestions(questionSolvedTableObj.allSolvedQuestions);
    setLoading(false);
  };

  const textColor = useRecoilValue(textColorAtom);

  useEffect(() => {
    getQuestionSolvedData();
  }, []);
  return (
    <div className="mr-8">
      <div className="flex items-center my-8 ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500  " />
        <span className="text-lg font-semibold dark:text-slate-500 text-blackLighter">
          Questions
        </span>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>
      {loading == true ? (
        <ChartType1 width={400} height={300} />
      ) : (
        <BarChart
          className="dark:bg-semiblack rounded-xl "
          xAxis={[{ scaleType: "band", data: ["Easy ", "Medium ", "Hard "] }]}
          series={[
            {
              label: user1,
              data: [
                allSolvedQuestions.easySolvedUser1,
                allSolvedQuestions.mediumSolvedUser1,
                allSolvedQuestions.hardSolvedUser1,
              ],
              color: "#FDAF7B",
            },
            {
              label: user2,
              data: [
                allSolvedQuestions.easySolvedUser2,
                allSolvedQuestions.mediumSolvedUser2,
                allSolvedQuestions.hardSolvedUser2,
              ],
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
      )}
    </div>
  );
}
