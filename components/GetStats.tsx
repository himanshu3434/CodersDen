"use client";
import React, { useState, useMemo } from "react";
import RatingTable from "./RatingTable";
import Button from "./Button";
import MinMaxTable from "./MinMaxTable";
import QuestionsSolvedTable from "./QuestionsSolvedTable";
import ContestTimeLine from "./ContestTimeLine";
import Submissions from "./Submissions";
import ContestWinCom from "./ContestWinCom";
import TotalContestPie from "./TotalContestPie";
import TypesofQuestions from "./TypesofQuestions";
import SessionBeatsTable from "./SessionBeatsTable";
import { UserProfile } from "@/actions/check/userProfile";
import { MaxRatingUp } from "@/actions/charts/MaxRatingUp";

function GetStats() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);
  const [maxRatingUp, setMaxRatingUp] = useState(0);
  const [maxRatingUser, setMaxRatingUser] = useState("");

  const handlerClick = async () => {
    setError(false);
    setValid(false);
    const profileCheckData = (await UserProfile(user1, user2)) ?? {
      valid: false,
      user1: "",
      user2: "",
    };
    const maxRatingUpDataObj = await MaxRatingUp(user1, user2);
    console.log(maxRatingUpDataObj);
    if (profileCheckData.valid) {
      setValid(true);
      setUserName1(profileCheckData.user1);
      setUserName2(profileCheckData.user2);
      setMaxRatingUp(maxRatingUpDataObj.userMaxRatingUp);
      setMaxRatingUser(maxRatingUpDataObj.user);
    } else {
      setError(true);
    }
  };

  // Memoizing the JSX for the tables to avoid re-rendering
  const ratingTable = useMemo(
    () => <RatingTable user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );
  const contestWinComparison = useMemo(
    () => <ContestWinCom user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );

  const totalContestPie = useMemo(
    () => <TotalContestPie user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );
  const minMaxTable = useMemo(
    () => <MinMaxTable user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );

  const questionsSolvedTable = useMemo(
    () => <QuestionsSolvedTable user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );

  const contestTimeLine = useMemo(
    () => <ContestTimeLine user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );

  const submissions = useMemo(
    () => <Submissions user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );
  const typesofQuestions = useMemo(
    () => <TypesofQuestions user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );

  const sessionBeats = useMemo(
    () => <SessionBeatsTable user1={userName1} user2={userName2} />,
    [userName1, userName2]
  );

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

      {valid && (
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
            {maxRatingUp > 0 && (
              <div className="text-5xl text-center dark:text-white font-bold mt-10 font-mono rounded-3xl text-blackLight">
                <span className="text-red-500 dark:text-red-400 tracking-wider">
                  Fact:
                </span>{" "}
                <span className="text-[#46e19e] mr-2 inline-block italic">
                  {maxRatingUser}
                </span>{" "}
                has maximum rating up of{" "}
                <span className="text-[#46e19e] italic">{maxRatingUp}</span>
                <span className="inline-block ml-2 mr-2 animate-bounce italic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-[#46e19e]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={5}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </span>
                points.
              </div>
            )}
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
