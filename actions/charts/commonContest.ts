"use server";
import { getCommonContest } from "@/computeUtils/getCommonContest";
import { getContestData } from "@/computeUtils/getContestData";

export const CommonContest = async (
  user1: string,
  user2: string
): Promise<any> => {
  const contestData = await getContestData(user1, user2);

  const user1Data = contestData.user1Data;
  const user2Data = contestData.user2Data;

  let commonContest = getCommonContest(user1, user2, user1Data, user2Data);
  return commonContest;
};
