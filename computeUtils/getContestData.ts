import { cache } from "@/cache/cacheInit";
import { contestApiType } from "@/types/types";
import axios from "axios";

export const getContestData = async (
  user1: string,
  user2: string
): Promise<any> => {
  let user1Data: contestApiType, user2Data: contestApiType;
  if (cache.get(user1) && cache.get(user2)) {
    user1Data = cache.get(user1) as contestApiType;
    user2Data = cache.get(user2) as contestApiType;
    console.log("exist in cache other function ");
  } else {
    const user1Res = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user1 + "/contest"
    );
    const user2Res = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user2 + "/contest"
    );
    if (
      !user1Res.data.contestParticipation ||
      !user2Res.data.contestParticipation
    ) {
      return { valid: false, user1Data: {}, user2Data: {} };
    }

    user1Data = user1Res.data;
    user2Data = user2Res.data;
    console.log("not exist in cache other function ");
  }

  return { valid: true, user1Data, user2Data };
};
