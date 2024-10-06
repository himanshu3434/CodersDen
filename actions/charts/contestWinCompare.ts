"use server";

import { getCommonContest } from "@/computeUtils/getCommonContest";
import { getContestData } from "@/computeUtils/getContestData";
import { ratingChangeType } from "@/types/types";

export const ContestWinCompare = async (
  user1: string,
  user2: string
): Promise<any> => {
  const contestData = await getContestData(user1, user2);
  const user1Data = contestData.user1Data;
  const user2Data = contestData.user2Data;

  const commonContest = getCommonContest(user1, user2, user1Data, user2Data);

  let user1Win = 0,
    user2Win = 0;
  commonContest.forEach((contest: ratingChangeType) => {
    if (contest.userWon) {
      user1Win++;
    } else {
      user2Win++;
    }
  });
  return { user1Win, user2Win };
};
