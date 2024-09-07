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
export type tableDataObjType = {
  valid: boolean;
  user1: string;
  user2: string;
  commonContests: ratingChangeType[];
  allRatings: minMaxtype;
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
