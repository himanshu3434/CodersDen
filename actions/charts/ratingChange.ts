"use server";
import axios from "axios";
import { ratingChangeType, tableDataObjType } from "@/types/types";
import { cache } from "@/cache/cacheInit";

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
    if (cache.get(user1)) {
      console.log(" exist incache ");
    } else console.log("not exist in cache ");
    cache.set(user1, user1Data.data, 1000);
    cache.set(user2, user2Data.data, 1000);
    let tableDataObj: tableDataObjType = {
      valid: true,
      user1,
      user2,
      commonContests: [],
      user1Win: 0,
      user2Win: 0,
      totalContestUser1: 0,
      totalContestUser2: 0,
      allRatings: {
        maxRatingUser1: 0,
        maxRatingUser2: 0,
        minRatingUser1: 0,
        minRatingUser2: 0,
        currentRatingUser1: 0,
        currentRatingUser2: 0,
      },
      allContestsUser1: [],
      allContestsUser2: [],
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
    tableDataObj.totalContestUser1 = attendedContestsUser1.length;
    tableDataObj.totalContestUser2 = attendedContestsUser2.length;
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
            timestamp: contest1.contest.startTime,
          };

          tableDataObj.commonContests.push(commonContestObj);
        }
      });
    });

    tableDataObj.commonContests.forEach((contest: ratingChangeType) => {
      if (contest.userWon) {
        tableDataObj.user1Win++;
      } else {
        tableDataObj.user2Win++;
      }
    });

    const maxRatingUser1 = user1Data.data.contestParticipation
      .map((contest: any) => Math.round(contest.rating))
      .reduce((acc: number, curr: number) => Math.max(acc, curr), 0);

    const maxRatingUser2 = user2Data.data.contestParticipation
      .map((contest: any) => Math.round(contest.rating))
      .reduce((acc: number, curr: number) => Math.max(acc, curr), 0);

    const minRatingUser1 = user1Data.data.contestParticipation
      .map((contest: any) => Math.round(contest.rating))
      .reduce((acc: number, curr: number) => Math.min(acc, curr), Infinity);

    const minRatingUser2 = user2Data.data.contestParticipation
      .map((contest: any) => Math.round(contest.rating))
      .reduce((acc: number, curr: number) => Math.min(acc, curr), Infinity);

    const currentRatingUser1 = Math.round(user1Data.data.contestRating);
    const currentRatingUser2 = Math.round(user2Data.data.contestRating);

    tableDataObj.allRatings.maxRatingUser1 = maxRatingUser1;
    tableDataObj.allRatings.maxRatingUser2 = maxRatingUser2;
    tableDataObj.allRatings.minRatingUser1 = minRatingUser1;
    tableDataObj.allRatings.minRatingUser2 = minRatingUser2;
    tableDataObj.allRatings.currentRatingUser1 = currentRatingUser1;
    tableDataObj.allRatings.currentRatingUser2 = currentRatingUser2;

    const allContestsUser1 = user1Data.data.contestParticipation.map(
      (contest: any) => {
        return {
          timestamp: contest.contest.startTime,
          rating: Math.round(contest.rating),
        };
      }
    );

    const allContestsUser2 = user2Data.data.contestParticipation.map(
      (contest: any) => {
        return {
          timestamp: contest.contest.startTime,
          rating: Math.round(contest.rating),
        };
      }
    );

    tableDataObj.allContestsUser1 = allContestsUser1;
    tableDataObj.allContestsUser2 = allContestsUser2;

    // console.log("table data ", tableDataObj);
    return tableDataObj;
  } catch (err) {
    console.log(err);
  }
};
