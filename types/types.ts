export type ratingChangeType = {
  ranking1: string;
  ranking2: string;
  problemsSolved1: string;
  problemsSolved2: string;
  distance: number;
  userWon: boolean;
  finishTimeInSeconds1: string;
  finishTimeInSeconds2: string;
  title: string;
};
export type minMaxtype = {
  maxRatingUser1: number;
  maxRatingUser2: number;
  minRatingUser1: number;
  minRatingUser2: number;
  currentRatingUser1: number;
  currentRatingUser2: number;
};
export type contestType = {
  timestamp: number;
  rating: number;
};
export type tableDataObjType = {
  valid: boolean;
  user1: string;
  user2: string;
  user1Win: number;
  user2Win: number;
  commonContests: ratingChangeType[];
  allRatings: minMaxtype;
  allContestsUser1: contestType[];
  allContestsUser2: contestType[];
};
export type RatingTableUiType = {
  valid: boolean;
  user1: string;
  user2: string;

  commonContests: ratingChangeType[];
};

export type minMaxTablePropsType = {
  user1: string;
  user2: string;
  allRatings: minMaxtype;
};
export type allQuestionsSolvedType = {
  easySolvedUser1: number;
  easySolvedUser2: number;
  mediumSolvedUser1: number;
  mediumSolvedUser2: number;
  hardSolvedUser1: number;
  hardSolvedUser2: number;
};

export type questionSolvedTableObjType = {
  user1: string;
  user2: string;
  allSolvedQuestions: allQuestionsSolvedType;
};
export type ContestTimeLinePropsType = {
  user1: string;
  user2: string;
  allContestsUser1: contestType[];
  allContestsUser2: contestType[];
};

export type SubmissionsDataType = [string, number][];

export type MaxSubmissionDataObjType = {
  user1MaxSubmissionsDay: number;
  user2MaxSubmissionsDay: number;
  user1MaxSubmissionsWeek: number;
  user2MaxSubmissionsWeek: number;
  user1MaxSubmissionsMonth: number;
  user2MaxSubmissionsMonth: number;
};
export type AllSubmissionDataType = {
  maxSubmissionDataObjType: MaxSubmissionDataObjType;
  streakUser1: number;
  streakUser2: number;
  totalActiveDaysUser1: number;
  totalActiveDaysUser2: number;
  totalSubmissionsUser1: number;
  totalSubmissionsUser2: number;
  availableYearsUser1: number[];
  availableYearsUser2: number[];
};
