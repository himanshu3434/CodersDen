"use server";

import { getContestData } from "@/computeUtils/getContestData";
import { contestApiType } from "../../types/types";

export const MaxRatingUp = async (
  user1: string,
  user2: string
): Promise<any> => {
  try {
    const contestData = await getContestData(user1, user2);
    const user1Data: contestApiType = contestData.user1Data;
    const user2Data: contestApiType = contestData.user2Data;
    const user1Rating = user1Data.contestParticipation.map(
      (contest) => contest.rating
    );
    let user1MaxRatingUp = -9999;
    for (let i = 1; i < user1Rating.length; i++) {
      const difference = user1Rating[i] - user1Rating[i - 1];
      if (difference > user1MaxRatingUp) {
        user1MaxRatingUp = difference;
      }
    }
    const user2Rating = user2Data.contestParticipation.map(
      (contest) => contest.rating
    );
    let user2MaxRatingUp = -9999;
    for (let i = 1; i < user2Rating.length; i++) {
      const difference = user2Rating[i] - user2Rating[i - 1];
      if (difference > user2MaxRatingUp) {
        user2MaxRatingUp = difference;
      }
    }
    user1MaxRatingUp = Math.round(user1MaxRatingUp);
    user2MaxRatingUp = Math.round(user2MaxRatingUp);

    if (user1MaxRatingUp > user2MaxRatingUp)
      return { userMaxRatingUp: user1MaxRatingUp, user: user1 };

    return { userMaxRatingUp: user2MaxRatingUp, user: user2 };
  } catch (error) {
    console.log(error);
  }
};
