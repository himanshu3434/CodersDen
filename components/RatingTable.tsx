import { RatingTableUiType } from "@/types/types";
import { formatTime } from "@/utils/formatTime";
import React from "react";

function RatingTable({ user1, user2, commonContests }: RatingTableUiType) {
  const [option, setOption] = React.useState(0);

  const ratingTable = (
    <div>
      <table className="min-w-[70vw]   ">
        <thead className="text-xl bg-blue-400  text-white h-[7vh] ">
          <th>Common Contest</th>
          <th className="text-purple-300">{user1}</th>
          <th className="text-yellow-300">{user2}</th>
          <th className="text-green-300">Distance</th>
        </thead>
        <tbody className=" text-center text-lg bg-white ">
          {commonContests.map((contest, index) => (
            <tr key={index} className=" hover:bg-gray-300 ">
              <td className="py-2 text-black">{contest.title}</td>
              <td className="text-purple-400">{contest.ranking1}</td>
              <td className="text-yellow-600">{contest.ranking2}</td>
              <td
                className={
                  contest.userWon === true
                    ? "text-purple-400"
                    : "text-yellow-600"
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
        <thead className="text-xl bg-blue-400 text-white h-[7vh]">
          <tr>
            <th className="px-4 py-2">Common Contest</th>
            <th className="text-purple-300  py-2 space-y-2 ">
              <div className="">{user1}</div>

              <div className="flex  justify-between px-3">
                <th className="">Question</th>
                <th className="">Time</th>
              </div>
            </th>
            <th className="text-yellow-300  py-2 space-y-2">
              <div>{user2}</div>

              <div className="flex  justify-between px-3">
                <th className="">Question</th>
                <th className="">Time</th>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-center text-lg bg-white">
          {commonContests.map((contest, index) => {
            const time1 = formatTime(contest.finishTimeInSeconds1);
            const time2 = formatTime(contest.finishTimeInSeconds2);

            return (
              <tr key={index} className="hover:bg-gray-300">
                <td className="py-2 text-black border border-gray-200">
                  {contest.title}
                </td>
                <td className="text-purple-400 border border-gray-200 ">
                  <div className=" flex justify-between ">
                    <td className="w-1/2 ">{contest.problemsSolved1}</td>
                    <td className=" w-1/2 "> {time1}</td>
                  </div>
                </td>

                <td className="text-yellow-600 border border-gray-200 ">
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
    <div className=" overflow-x-auto ">
      <div className="bg-blue-900 max-w-fit m-3 mx-auto  rounded-xl overflow-hidden  text-white  ">
        <button
          className={`p-3 ${option === 0 ? "bg-blue-500 font-bold" : ""}`}
          onClick={() => setOption(0)}
        >
          Rating
        </button>
        <button
          className={`p-3 ${option === 1 ? "bg-blue-500 font-bold" : ""}`}
          onClick={() => setOption(1)}
        >
          Details
        </button>
      </div>

      <div className="flex flex-col items-center  shadow-lg rounded-2xl ">
        <div className="text-2xl my-3 font-bold">
          {option === 1 ? "Details " : "Rating "}Table
        </div>
        {option === 1 ? detailsTable : ratingTable}
      </div>
    </div>
  );
}

export default RatingTable;
