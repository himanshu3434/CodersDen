"use client";
import React, { useState, useCallback, useMemo } from "react";
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
  const [lowercaseUser1, setLowercaseUser1] = useState("");
  const [lowercaseUser2, setLowercaseUser2] = useState("");
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
    setLowercaseUser1(user1.toLowerCase().trim());
    setLowercaseUser2(user2.toLowerCase().trim());
    const alldata = await RatingChange(lowercaseUser1, lowercaseUser2);
    const questionSolvedTableObj = await QuestionSolved(
      lowercaseUser1,
      lowercaseUser2
    );
    const typesQuestionSolvedObj = await TypesQuestionSolved(
      lowercaseUser1,
      lowercaseUser2
    );
    const sessionBeatsObj = await UserSessionBeats(
      lowercaseUser1,
      lowercaseUser2
    );

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

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="shadow-lg mx-auto flex flex-col items-center w-[30rem] p-5 my-7 dark:bg-semiblack dark:rounded-lg">
        <div className="my-3 flex">
          <input
            type="text"
            onChange={(e) => setUser1(e.target.value)}
            value={user1}
            placeholder="Ex:babu_323"
            className="mx-2 w-48 h-10 rounded-md p-3 border-b-2 outline-none focus:border-blue-400 dark:bg-semiblack dark:placeholder-slate-500 dark:text-white "
          />
          <input
            type="text"
            onChange={(e) => setUser2(e.target.value)}
            value={user2}
            placeholder="Ex:shubham_123"
            className="w-48 h-10 rounded-md p-3 border-b-2 outline-none focus:border-blue-400 dark:bg-semiblack dark:placeholder-slate-500 dark:text-white"
          />
        </div>
        {error && <div className="my-4 text-red-600">User Not Found</div>}

        <Button
          type="button"
          onClick={handlerClick}
          className="p-3 bg-blue-400 rounded-lg text-white hover:bg-blue-300 shadow-md"
        >
          Compare
        </Button>
      </div>

      {data && (
        <div className="text-center dark:text-white ">
          <div>
            <h1 className="text-3xl font-bold dark:text-purple">
              Basic Comparison{" "}
            </h1>
            <hr className="w-[50vw] mx-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-8 border-0" />
            <div>{submissions}</div>
            <div>{questionsSolvedTable}</div>
          </div>
          <div>
            <h1>Contest Comparison</h1>

            <div>{contestTimeLine}</div>
            <div>{contestWinComparison}</div>
            <div>{totalContestPie}</div>
            <div>{minMaxTable}</div>
          </div>

          {ratingTable}

          {typesofQuestions}

          {sessionBeats}
        </div>
      )}
    </div>
  );
}

export default GetStats;
