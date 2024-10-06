"use server";

import { getContestData } from "@/computeUtils/getContestData";

export const TotalContest = async (
  user1: string,
  user2: string
): Promise<any> => {
  try {
    let totalContestData = {
      valid: true,
      totalContestUser1: 0,
      totalContestUser2: 0,
      error: "",
    };
    const contestData = await getContestData(user1, user2);
    const user1Data = contestData.user1Data;
    const user2Data = contestData.user2Data;
    if (!user1Data.contestParticipation || !user2Data.contestParticipation) {
      totalContestData.valid = false;
      totalContestData.error = !user1Data.contestParticipation ? user1 : user2;
      return totalContestData;
    }

    totalContestData.totalContestUser1 = user1Data.contestParticipation.length;
    totalContestData.totalContestUser2 = user2Data.contestParticipation.length;

    return totalContestData;
  } catch (e) {
    console.log(" errror while fetching total contest data ", e);
  }
};
