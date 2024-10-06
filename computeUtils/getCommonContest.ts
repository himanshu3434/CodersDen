import { cache } from "@/cache/cacheInit";
import { contestApiType, ratingChangeType } from "@/types/types";

export const getCommonContest = (
  user1: string,
  user2: string,
  user1Data: contestApiType,
  user2Data: contestApiType
): ratingChangeType[] => {
  let commonContests: ratingChangeType[] = [];
  if (cache.get(user1 + user2 + "commonContest")) {
    commonContests = cache.get(
      user1 + user2 + "commonContest"
    ) as ratingChangeType[];
  } else {
    const attendedContestsUser1 = user1Data.contestParticipation.filter(
      (contest: any) => contest.attended === true
    );
    const attendedContestsUser2 = user2Data.contestParticipation.filter(
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
            timestamp: contest1.contest.startTime,
          };

          commonContests.push(commonContestObj);
        }
      });
    });
  }

  return commonContests;
};
