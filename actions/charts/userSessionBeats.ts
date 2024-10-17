"use server";
import { userSessionBeatsObjType } from "@/types/types";
import axios from "axios";

export const UserSessionBeats = async (user1: string, user2: string) => {
  try {
    const user1Data = await axios.get(
      process.env.Leetcode_Data_URL +
        "/userProfileUserQuestionProgressV2/" +
        user1
    );
    const user2Data = await axios.get(
      process.env.Leetcode_Data_URL +
        "/userProfileUserQuestionProgressV2/" +
        user2
    );
    let userSessionBeatsObj: userSessionBeatsObjType = {
      user1,
      user2,
      allSessionBeats: {
        user1SessionBeatsEasy: 0,
        user1SessionBeatsMedium: 0,
        user1SessionBeatsHard: 0,
        user2SessionBeatsEasy: 0,
        user2SessionBeatsMedium: 0,
        user2SessionBeatsHard: 0,
      },
    };
    const user1SessionBeatsEasy =
      user1Data.data.data.userProfileUserQuestionProgressV2
        .userSessionBeatsPercentage[0].percentage;
    const user1SessionBeatsMedium =
      user1Data.data.data.userProfileUserQuestionProgressV2
        .userSessionBeatsPercentage[1].percentage;
    const user1SessionBeatsHard =
      user1Data.data.data.userProfileUserQuestionProgressV2
        .userSessionBeatsPercentage[2].percentage;

    const user2SessionBeatsEasy =
      user2Data.data.data.userProfileUserQuestionProgressV2
        .userSessionBeatsPercentage[0].percentage;
    const user2SessionBeatsMedium =
      user2Data.data.data.userProfileUserQuestionProgressV2
        .userSessionBeatsPercentage[1].percentage;
    const user2SessionBeatsHard =
      user2Data.data.data.userProfileUserQuestionProgressV2
        .userSessionBeatsPercentage[2].percentage;

    userSessionBeatsObj.allSessionBeats.user1SessionBeatsEasy = Math.round(
      user1SessionBeatsEasy
    );
    userSessionBeatsObj.allSessionBeats.user1SessionBeatsMedium = Math.round(
      user1SessionBeatsMedium
    );
    userSessionBeatsObj.allSessionBeats.user1SessionBeatsHard = Math.round(
      user1SessionBeatsHard
    );
    userSessionBeatsObj.allSessionBeats.user2SessionBeatsEasy = Math.round(
      user2SessionBeatsEasy
    );
    userSessionBeatsObj.allSessionBeats.user2SessionBeatsMedium = Math.round(
      user2SessionBeatsMedium
    );
    userSessionBeatsObj.allSessionBeats.user2SessionBeatsHard = Math.round(
      user2SessionBeatsHard
    );

    return userSessionBeatsObj;
  } catch (error) {
    console.log(error);
  }
};
