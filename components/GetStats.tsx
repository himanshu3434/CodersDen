"use client";
import React, { useState, useCallback, useMemo, use, useEffect } from "react";
import RatingTable from "./RatingTable";
import { RatingChange } from "@/actions/charts/ratingChange";
import Button from "./Button";
import {
  questionSolvedTableObjType,
  tableDataObjType,
  typesQuestionSolvedObjType,
  userSessionBeatsObjType,
} from "@/types/types";
import MinMaxTable from "./MinMaxTable";
import { QuestionSolved } from "@/actions/charts/questionSolved";
import QuestionsSolvedTable from "./QuestionsSolvedTable";
import ContestTimeLine from "./ContestTimeLine";
import Submissions from "./Submissions";
import ContestWinCom from "./ContestWinCom";
import TotalContestPie from "./TotalContestPie";
import { TypesQuestionSolved } from "@/actions/charts/typesofquestion";
import TypesofQuestions from "./TypesofQuestions";
import { Slider } from "@mui/material";
import { UserSessionBeats } from "@/actions/charts/userSessionBeats";
import { Session } from "inspector/promises";
import SessionBeatsTable from "./SessionBeatsTable";

function GetStats() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  const [error, setError] = useState(false);
  const [data, setData] = useState<tableDataObjType>();
  const [questionSolvedTableData, setQuestionSolvedTableData] =
    useState<questionSolvedTableObjType>();
  const [typesQuestionSolvedData, setTypesQuestionSolvedData] =
    useState<typesQuestionSolvedObjType>();
  const [sessionBeatsData, setSessionBeatsData] =
    useState<userSessionBeatsObjType>();
  const handlerClick = async () => {
    setError(false);
    setData(undefined);
    setQuestionSolvedTableData(undefined);
    setTypesQuestionSolvedData(undefined);
    setSessionBeatsData(undefined);

    const alldata = await RatingChange(user1, user2);
    const questionSolvedTableObj = await QuestionSolved(user1, user2);
    const typesQuestionSolvedObj = await TypesQuestionSolved(user1, user2);
    const sessionBeatsObj = await UserSessionBeats(user1, user2);

    if (alldata.valid) {
      setData(alldata);
      setQuestionSolvedTableData(questionSolvedTableObj);
      setTypesQuestionSolvedData(typesQuestionSolvedObj);
      setSessionBeatsData(sessionBeatsObj);
    } else {
      setError(true);
    }
  };

  // Memoizing the JSX for the tables to avoid re-rendering
  const ratingTable = useMemo(
    () =>
      data && (
        <RatingTable
          valid={data.valid}
          user1={data.user1}
          user2={data.user2}
          commonContests={data.commonContests}
        />
      ),
    [data]
  );
  const contestWinComparison = useMemo(
    () =>
      data && (
        <ContestWinCom
          user1={data.user1}
          user2={data.user2}
          user1Win={data.user1Win}
          user2Win={data.user2Win}
        />
      ),
    [data]
  );

  const totalContestPie = useMemo(
    () =>
      data && (
        <TotalContestPie
          user1={data.user1}
          user2={data.user2}
          totalContestUser1={data.totalContestUser1}
          totalContestUser2={data.totalContestUser2}
        />
      ),
    [data]
  );
  const minMaxTable = useMemo(
    () =>
      data && (
        <MinMaxTable
          user1={data.user1}
          user2={data.user2}
          allRatings={data.allRatings}
        />
      ),
    [data]
  );

  const questionsSolvedTable = useMemo(
    () =>
      questionSolvedTableData && (
        <QuestionsSolvedTable
          user1={questionSolvedTableData.user1}
          user2={questionSolvedTableData.user2}
          allSolvedQuestions={questionSolvedTableData.allSolvedQuestions}
        />
      ),
    [questionSolvedTableData]
  );

  const contestTimeLine = useMemo(
    () =>
      data && (
        <ContestTimeLine
          user1={data.user1}
          user2={data.user2}
          allContestsUser1={data.allContestsUser1}
          allContestsUser2={data.allContestsUser2}
        />
      ),
    [data]
  );

  const submissions = useMemo(
    () => data && <Submissions user1={data.user1} user2={data.user2} />,
    [data]
  );
  const typesofQuestions = useMemo(
    () =>
      typesQuestionSolvedData && (
        <TypesofQuestions
          user1={typesQuestionSolvedData.user1}
          user2={typesQuestionSolvedData.user2}
          tagProblemUser1={typesQuestionSolvedData.tagProblemUser1}
          tagProblemUser2={typesQuestionSolvedData.tagProblemUser2}
        />
      ),
    [typesQuestionSolvedData]
  );

  const sessionBeats = useMemo(
    () =>
      sessionBeatsData && (
        <SessionBeatsTable
          user1={sessionBeatsData.user1}
          user2={sessionBeatsData.user2}
          allSessionBeats={sessionBeatsData.allSessionBeats}
        />
      ),
    [sessionBeatsData]
  );
  useEffect(() => {
    console.log("rendered");
  });
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="shadow-lg mx-auto flex flex-col items-center w-[30rem] p-5 my-7 dark:bg-semiblack rounded-3xl">
        <div className="my-3 flex">
          <input
            type="text"
            onChange={(e) => setUser1(e.target.value)}
            value={user1}
            placeholder="Ex:babu_323"
            className="mx-2 w-48 h-10 rounded-md p-3 border-b-2 outline-none focus:border-semiblack dark:focus:border-white dark:bg-semiblack dark:placeholder-slate-500 dark:text-white "
          />
          <i className="mt-4 mr-2 text-slate-400s dark:text-white ">vs</i>
          <input
            type="text"
            onChange={(e) => setUser2(e.target.value)}
            value={user2}
            placeholder="Ex:shubham_123"
            className="w-48 h-10 rounded-md p-3 border-b-2 outline-none focus:border-semiblack dark:focus:border-white dark:bg-semiblack dark:placeholder-slate-500 dark:text-white"
          />
        </div>
        {error && <div className="my-4 text-red-600">User Not Found</div>}

        <Button
          type="button"
          onClick={handlerClick}
          className="p-3 pl-8 pr-8  mt-2 bg-[#262626] dark:bg-white rounded-3xl text-white dark:text-black  shadow-md"
        >
          Compare
        </Button>
      </div>

      {data && (
        <div>
          <div className="text-center dark:text-white ">
            <h1 className="text-3xl font-bold text-blackLight dark:text-purple mt-5  tracking-wide font-mono">
              Basic Comparison{" "}
            </h1>
            <hr className="w-[70vw] mx-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-4  border-0" />
            <div>{submissions}</div>
            <div className="flex flex-col items-center mt-8">
              <div className="flex items-center mt-6  w-2/3">
                <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500  " />
                <span className="text-xl font-semibold dark:text-slate-500 tracking-wider text-blackLighter">
                  Questions Stats
                </span>
                <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
              </div>
              <div className="flex  justify-center items-center mt-2">
                <div>{questionsSolvedTable}</div>
                <div>{sessionBeats}</div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h1 className="">
              <h1 className="text-3xl font-bold dark:text-purple text-center font-mono text-blackLight">
                Contest Comparison{" "}
              </h1>
              <hr className="w-[70vw] mx-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-5 border-0" />
            </h1>

            <div>{contestTimeLine}</div>
            <div className="flex mt-5 justify-between ">
              <div>{contestWinComparison}</div>
              <div>{totalContestPie}</div>
            </div>
            <div className="flex justify-center mt-5">{minMaxTable}</div>
          </div>
          <div className="mt-20">
            <div className="text-center ">
              <h1 className="text-3xl font-bold dark:text-purple mt-5  tracking-wide font-mono text-blackLight">
                Detailed Contest Stats{" "}
              </h1>
              <hr className="w-[70vw] mx-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-4  border-0" />
            </div>
            <div>{ratingTable}</div>
          </div>

          {typesofQuestions}
        </div>
      )}
    </div>
  );
}

export default GetStats;
