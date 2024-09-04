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
export type tableDataObjType = {
  valid: boolean;
  user1: string;
  user2: string;
  commonContests: ratingChangeType[];
};
