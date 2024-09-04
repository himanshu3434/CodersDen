import { tableDataObjType } from "@/types/types";
import React from "react";

function RatingTable({ user1, user2, commonContests }: tableDataObjType) {
  return (
    <div className="overflow-x-auto flex justify-center ">
      <table className="min-w-[70vw] shadow-lg  ">
        <thead className="text-xl bg-blue-400  text-white h-[7vh] ">
          <th>Common Contest</th>
          <th className="text-purple-300">{user1}</th>
          <th className="text-yellow-300">{user2}</th>
          <th className="text-green-300">Distance</th>
        </thead>
        <tbody className=" text-center text-lg">
          {commonContests.map((contest, index) => (
            <tr key={index} className=" hover:bg-gray-300 ">
              <td className="py-2">{contest.title}</td>
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
}

export default RatingTable;
