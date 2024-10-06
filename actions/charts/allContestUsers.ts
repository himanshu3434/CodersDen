"use server";

import { getContestData } from "@/computeUtils/getContestData";

export const AllContestUsers = async (
  user1: string,
  user2: string
): Promise<any> => {
  const contestData = await getContestData(user1, user2);
  const user1Data = contestData.user1Data;
  const user2Data = contestData.user2Data;
  const allContestsUser1 = user1Data.contestParticipation.map(
    (contest: any) => {
      return {
        timestamp: contest.contest.startTime,
        rating: Math.round(contest.rating),
      };
    }
  );

  const allContestsUser2 = user2Data.contestParticipation.map(
    (contest: any) => {
      return {
        timestamp: contest.contest.startTime,
        rating: Math.round(contest.rating),
      };
    }
  );

  return { allContestsUser1, allContestsUser2 };
};
