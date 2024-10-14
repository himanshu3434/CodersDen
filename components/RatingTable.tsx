import { CommonContest } from "@/actions/charts/commonContest";
import {
  ratingChangeType,
  RatingTableUiType,
  userNameComponentType,
} from "@/types/types";
import { formatTime } from "@/utils/formatTime";
import React, { useEffect, useState } from "react";
interface RatingChangeDisplayType extends ratingChangeType {
  timestampString: string;
}
function RatingTable({ user1, user2 }: userNameComponentType) {
  const [option, setOption] = React.useState(0);
  const [updatedCommonContests, setUpdatedCommonContests] = useState<
    RatingChangeDisplayType[]
  >([]);

  const getCommonContest = async () => {
    const tableData = (await CommonContest(user1, user2)) as ratingChangeType[];
    console.log(" common contest data ", tableData);
    const updatedCommonContestsData = tableData.map((contest) => {
      const date = new Date(contest.timestamp * 1000); // Convert Unix timestamp to milliseconds
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options); // Format date
      return {
        ...contest,
        timestampString: formattedDate, // Update the timestamp with the formatted date
      };
    });

    setUpdatedCommonContests(updatedCommonContestsData);
  };
  useEffect(() => {
    getCommonContest();
  }, []);
  const ratingTable = (
    <div className="">
      <table className="min-w-[70vw]  dark:bg-semiblack   ">
        <thead className="text-xl bg-[#262626] dark:bg-blue-600 text-white  dark:text-gray-200 h-[7vh] ">
          <th className="dark:text-white">Date</th>
          <th className="dark:text-white">Common Contest</th>
          <th className="text-colorChartV1 ">{user1}</th>
          <th className="text-colorChartV2">{user2}</th>
          <th className="text-green-300">Distance</th>
        </thead>
        <tbody className=" text-center text-lg bg-white dark:bg-semiblack ">
          {updatedCommonContests.map((contest, index) => (
            <tr key={index} className=" hover:bg-gray-300 dark:hover:bg-black ">
              <td className="py-2 text-black dark:text-gray-300">
                {contest.timestampString}
              </td>
              <td className="py-2 text-black dark:text-gray-300">
                {contest.title}
              </td>
              <td className="text-colorChartV1">{contest.ranking1}</td>
              <td className="text-colorChartV2 ">{contest.ranking2}</td>
              <td
                className={
                  contest.userWon === true
                    ? "text-colorChartV1"
                    : "text-colorChartV2"
                }
              >
                {contest.distance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const detailsTable = (
    <div className="overflow-x-auto">
      <table className="min-w-[70vw] border-collapse border border-gray-200">
        <thead className="text-xl bg-blue-400 dark:bg-blue-600 dark:text-gray-200 text-white h-[7vh]">
          <tr>
            <th>Date</th>
            <th className="px-4 py-2">Common Contest</th>
            <th className="text-colorChartV1  py-2 space-y-2 ">
              <div className="">{user1}</div>

              <div className="flex  justify-between px-3">
                <th className="">Question</th>
                <th className="">Time</th>
              </div>
            </th>
            <th className="text-colorChartV2  py-2 space-y-2">
              <div>{user2}</div>

              <div className="flex  justify-between px-3">
                <th className="">Question</th>
                <th className="">Time</th>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-center text-lg bg-white dark:bg-semiblack ">
          {updatedCommonContests.map((contest, index) => {
            const time1 = formatTime(contest.finishTimeInSeconds1);
            const time2 = formatTime(contest.finishTimeInSeconds2);

            return (
              <tr key={index} className="hover:bg-gray-300 dark:hover:bg-black">
                <td className="py-2 text-black dark:text-gray-300 border border-gray-200">
                  {contest.timestamp}
                </td>
                <td className="py-2 text-black dark:text-gray-300 border border-gray-200">
                  {contest.title}
                </td>
                <td className="text-colorChartV1 border border-gray-200 ">
                  <div className=" flex justify-between ">
                    <td className="w-1/2 ">{contest.problemsSolved1}</td>
                    <td className=" w-1/2 "> {time1}</td>
                  </div>
                </td>

                <td className="text-colorChartV2 border border-gray-200 ">
                  <div className=" flex justify-between ">
                    <td className="w-1/2 ">{contest.problemsSolved2}</td>
                    <td className=" w-1/2  "> {time2}</td>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className=" overflow-x-auto  flex items-center flex-col">
      <div className="w-2/3 flex items-center ">
        <hr className="flex-grow border-t-2 dark:border-semiblack mr-4  border-gray-500  " />
        {/* <span className="text-xl font-semibold dark:text-slate-500 tracking-wider">
          Total Contest
        </span> */}
        <div className=" bg-semiblack dark:bg-slate-800  max-w-fit m-3 mx-auto  rounded-3xl overflow-hidden  text-white font-bold tracking-wider  ">
          <button
            className={`p-3 ${
              option === 0
                ? "bg-[#3A3A3A] dark:bg-semiblack font-semibold "
                : ""
            }`}
            onClick={() => setOption(0)}
          >
            Rating
          </button>
          <button
            className={`p-3 ${
              option === 1 ? "bg-[#3A3A3A] dark:bg-semiblack font-medium" : ""
            }`}
            onClick={() => setOption(1)}
          >
            Detailed
          </button>
        </div>
        <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500 " />
      </div>

      <div className="flex flex-col items-center  shadow-lg rounded-2xl ">
        <div className="flex items-center  w-2/3 my-4">
          <hr className="flex-grow border-t-2 dark:border-semiblack mr-4 border-gray-500   " />
          <div className="text-xl font-semibold dark:text-slate-500 tracking-wide text-blackLighter">
            {option === 1 ? "Detailed " : "Rating "}Table
          </div>
          <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500   " />
        </div>

        <div className="my-3">{option === 1 ? detailsTable : ratingTable}</div>
      </div>
    </div>
  );
}

export default RatingTable;
