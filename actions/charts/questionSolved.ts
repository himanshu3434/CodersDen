"use server";
import { questionSolvedTableObjType } from "@/types/types";
import axios from "axios";

export const QuestionSolved = async (
  user1: string,
  user2: string
): Promise<any> => {
  try {
    // console.log("ssdasd" + user1 + " " + user2);
    // console.log(process.env.Leetcode_Data_URL + "/" + user1 + "/solved");
    const user1Data = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user1 + "/solved"
    );
    const user2Data = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user2 + "/solved"
    );
    // console.log(user1Data.data);

    let questionSolvedTableObj: questionSolvedTableObjType = {
      user1,
      user2,
      allSolvedQuestions: {
        easySolvedUser1: 0,
        mediumSolvedUser1: 0,
        hardSolvedUser1: 0,
        easySolvedUser2: 0,
        mediumSolvedUser2: 0,
        hardSolvedUser2: 0,
      },
    };

    if (!user1Data.data || !user2Data.data) {
      return questionSolvedTableObj;
    }

    questionSolvedTableObj.allSolvedQuestions.easySolvedUser1 =
      user1Data.data.easySolved;
    questionSolvedTableObj.allSolvedQuestions.mediumSolvedUser1 =
      user1Data.data.mediumSolved;
    questionSolvedTableObj.allSolvedQuestions.hardSolvedUser1 =
      user1Data.data.hardSolved;
    questionSolvedTableObj.allSolvedQuestions.easySolvedUser2 =
      user2Data.data.easySolved;
    questionSolvedTableObj.allSolvedQuestions.mediumSolvedUser2 =
      user2Data.data.mediumSolved;
    questionSolvedTableObj.allSolvedQuestions.hardSolvedUser2 =
      user2Data.data.hardSolved;

    // console.log(questionSolvedTableObj);
    return questionSolvedTableObj;
  } catch (error) {
    console.log(error);
  }
};
