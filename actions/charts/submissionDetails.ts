"use server";
import {
  AllSubmissionDataType,
  MaxSubmissionDataObjType,
  SubmissionsDataType,
} from "@/types/types";
import axios from "axios";

const getDayOfTheYear = (unixDate: number) => {
  const date = new Date(unixDate * 1000);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const milliSecondsDifferece = date.getTime() - yearStart.getTime();
  const days = Math.floor(milliSecondsDifferece / (1000 * 60 * 60 * 24) + 1);
  return days;
};
const getMonthFromUnixTimeStamps = (unixDate: number) => {
  const date = new Date(unixDate * 1000);
  return date.getMonth();
};
const getWeekSubmissions = (user1Submissions: SubmissionsDataType) => {
  const submissionWithDay = user1Submissions.map((sub) => {
    const day = getDayOfTheYear(parseInt(sub[0]));
    return [day, sub[1]];
  });

  let weekStart = submissionWithDay[0][0];
  let sum = submissionWithDay[0][1];
  let maxSum = 0;
  for (let i = 1; i < submissionWithDay.length; i++) {
    if (submissionWithDay[i][0] - weekStart > 7) {
      weekStart = submissionWithDay[i][0];
      maxSum = Math.max(maxSum, sum);
      sum = 0;
    }
    sum += submissionWithDay[i][1];
  }

  return maxSum;
};

const getMonthSubmissions = (user1Submissions: SubmissionsDataType) => {
  const monthWiseSum = Array.from({ length: 12 }, () => 0);

  user1Submissions.forEach((sub) => {
    const month = getMonthFromUnixTimeStamps(parseInt(sub[0]));
    monthWiseSum[month] += sub[1];
  });

  return Math.max(...monthWiseSum);
};
export const SubmissionsDetails = async (
  user1: string,
  user2: string,
  year: number
) => {
  const user1Data = await axios.get(
    process.env.Leetcode_Data_URL +
      "/userProfileCalendar?username=" +
      user1 +
      "&year=" +
      year
  );
  const user2Data = await axios.get(
    process.env.Leetcode_Data_URL +
      "/userProfileCalendar?username=" +
      user2 +
      "&year=" +
      year
  );
  const maxSubmissionsDataObj: MaxSubmissionDataObjType = {
    user1MaxSubmissionsDay: 0,
    user2MaxSubmissionsDay: 0,
    user1MaxSubmissionsWeek: 0,
    user2MaxSubmissionsWeek: 0,
    user1MaxSubmissionsMonth: 0,
    user2MaxSubmissionsMonth: 0,
  };
  const user1Submissions: SubmissionsDataType = Object.entries(
    JSON.parse(user1Data.data.data.matchedUser.userCalendar.submissionCalendar)
  );
  const user2Submissions: SubmissionsDataType = Object.entries(
    JSON.parse(user2Data.data.data.matchedUser.userCalendar.submissionCalendar)
  );

  maxSubmissionsDataObj.user1MaxSubmissionsDay = user1Submissions
    .map((sub) => sub[1])
    .reduce((acc, curr) => Math.max(acc, curr), 0);
  maxSubmissionsDataObj.user2MaxSubmissionsDay = user2Submissions
    .map((sub) => sub[1])
    .reduce((acc, curr) => Math.max(acc, curr), 0);

  maxSubmissionsDataObj.user1MaxSubmissionsWeek =
    getWeekSubmissions(user1Submissions);
  maxSubmissionsDataObj.user2MaxSubmissionsWeek =
    getWeekSubmissions(user2Submissions);

  maxSubmissionsDataObj.user1MaxSubmissionsMonth =
    getMonthSubmissions(user1Submissions);
  maxSubmissionsDataObj.user2MaxSubmissionsMonth =
    getMonthSubmissions(user2Submissions);

  const allSubmissionsData: AllSubmissionDataType = {
    maxSubmissionDataObjType: maxSubmissionsDataObj,
    streakUser1: user1Data.data.data.matchedUser.userCalendar.streak,
    streakUser2: user2Data.data.data.matchedUser.userCalendar.streak,
    totalActiveDaysUser1:
      user1Data.data.data.matchedUser.userCalendar.totalActiveDays,
    totalActiveDaysUser2:
      user2Data.data.data.matchedUser.userCalendar.totalActiveDays,
    totalSubmissionsUser1: 0,
    totalSubmissionsUser2: 0,
    availableYearsUser1:
      user1Data.data.data.matchedUser.userCalendar.activeYears,
    availableYearsUser2:
      user2Data.data.data.matchedUser.userCalendar.activeYears,
  };

  allSubmissionsData.totalSubmissionsUser1 = user1Submissions
    .map((sub) => sub[1])
    .reduce((acc, curr) => acc + curr, 0);
  allSubmissionsData.totalSubmissionsUser2 = user2Submissions
    .map((sub) => sub[1])
    .reduce((acc, curr) => acc + curr, 0);

  return allSubmissionsData;
};
