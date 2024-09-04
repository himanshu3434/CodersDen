"use server";
import axios from "axios";
import { ratingChangeType, tableDataObjType } from "@/types/types";

export const RatingChange = async (
  user1: string,
  user2: string
): Promise<any> => {
  try {
    const user1Data = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user1 + "/contest"
    );
    const user2Data = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user2 + "/contest"
    );
    let tableDataObj: tableDataObjType = {
      valid: true,
      user1,
      user2,
      commonContests: [],
    };

    if (
      !user1Data.data.contestParticipation ||
      !user2Data.data.contestParticipation
    ) {
      tableDataObj.valid = false;

      return tableDataObj;
    }
    const attendedContestsUser1 = user1Data.data.contestParticipation.filter(
      (contest: any) => contest.attended === true
    );
    const attendedContestsUser2 = user2Data.data.contestParticipation.filter(
      (contest: any) => contest.attended === true
    );

    attendedContestsUser1.forEach((contest1: any) => {
      attendedContestsUser2.forEach((contest2: any) => {
        if (contest1.contest.title === contest2.contest.title) {
          let commonContestObj: ratingChangeType = {
            ranking1: contest1.ranking,
            ranking2: contest2.ranking,

            problemsSolved1: contest1.problemsSolved,
            problemsSolved2: contest2.problemsSolved,
            distance: Math.abs(contest1.ranking - contest2.ranking),
            userWon: contest1.ranking < contest2.ranking ? true : false,

            finishTimeInSeconds1: contest1.finishTimeInSeconds,
            finishTimeInSeconds2: contest2.finishTimeInSeconds,

            title: contest1.contest.title,
          };

          tableDataObj.commonContests.push(commonContestObj);
        }
      });
    });
    console.log("table data ", tableDataObj);
    return tableDataObj;
  } catch (err) {
    console.log(err);
  }
};
