"use server";

import { typesQuestionSolvedObjType } from "@/types/types";
import axios from "axios";

export const TypesQuestionSolved = async (user1: string, user2: string) => {
  try {
    const user1Data = await axios.get(
      process.env.Leetcode_Data_URL + "/skillstats/" + user1
    );
    const user2Data = await axios.get(
      process.env.Leetcode_Data_URL + "/skillstats/" + user2
    );
    //   console.log(user1Data.data);
    //   console.log(user2Data.data.data);

    let typesQuestionSolvedObj: typesQuestionSolvedObjType = {
      user1,
      user2,
      tagProblemUser1: [],
      tagProblemUser2: [],
    };

    if (!user1Data.data || !user2Data.data) {
      return typesQuestionSolvedObj;
    }

    const tagProblemU1 = [
      ...user1Data.data.data.matchedUser.tagProblemCounts.advanced.map(
        (tag: any) => {
          return {
            tagName: tag.tagName,
            problemsSolved: tag.problemsSolved,
          };
        }
      ),
      ...user1Data.data.data.matchedUser.tagProblemCounts.intermediate.map(
        (tag: any) => {
          return {
            tagName: tag.tagName,
            problemsSolved: tag.problemsSolved,
          };
        }
      ),
      ...user1Data.data.data.matchedUser.tagProblemCounts.fundamental.map(
        (tag: any) => {
          return {
            tagName: tag.tagName,
            problemsSolved: tag.problemsSolved,
          };
        }
      ),
    ];
    const tagProblemU2 = [
      ...user2Data.data.data.matchedUser.tagProblemCounts.advanced.map(
        (tag: any) => {
          return {
            tagName: tag.tagName,
            problemsSolved: tag.problemsSolved,
          };
        }
      ),
      ...user2Data.data.data.matchedUser.tagProblemCounts.intermediate.map(
        (tag: any) => {
          return {
            tagName: tag.tagName,
            problemsSolved: tag.problemsSolved,
          };
        }
      ),
      ...user2Data.data.data.matchedUser.tagProblemCounts.fundamental.map(
        (tag: any) => {
          return {
            tagName: tag.tagName,
            problemsSolved: tag.problemsSolved,
          };
        }
      ),
    ];

    typesQuestionSolvedObj.tagProblemUser1 = tagProblemU1;
    typesQuestionSolvedObj.tagProblemUser2 = tagProblemU2;

    return typesQuestionSolvedObj;
  } catch (error) {
    console.log(error);
  }
};
