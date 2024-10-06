"use server";

import { getContestData } from "@/computeUtils/getContestData";

export const DifferentRatingCompare = async (user1: string, user2: string) => {
  const contestData = await getContestData(user1, user2);
  const user1Data = contestData.user1Data;
  const user2Data = contestData.user2Data;
  const maxRatingUser1 = user1Data.contestParticipation
    .map((contest: any) => Math.round(contest.rating))
    .reduce((acc: number, curr: number) => Math.max(acc, curr), 0);

  const maxRatingUser2 = user2Data.contestParticipation
    .map((contest: any) => Math.round(contest.rating))
    .reduce((acc: number, curr: number) => Math.max(acc, curr), 0);

  const minRatingUser1 = user1Data.contestParticipation
    .map((contest: any) => Math.round(contest.rating))
    .reduce((acc: number, curr: number) => Math.min(acc, curr), Infinity);

  const minRatingUser2 = user2Data.contestParticipation
    .map((contest: any) => Math.round(contest.rating))
    .reduce((acc: number, curr: number) => Math.min(acc, curr), Infinity);

  const currentRatingUser1 = Math.round(user1Data.contestRating);
  const currentRatingUser2 = Math.round(user2Data.contestRating);

  return {
    maxRatingUser1,
    maxRatingUser2,
    minRatingUser1,
    minRatingUser2,
    currentRatingUser1,
    currentRatingUser2,
  };
};
