"use server";
import axios from "axios";

export const UserProfile = async (user1: string, user2: string) => {
  try {
    const user1Profile = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user1
    );
    const user2Profile = await axios.get(
      process.env.Leetcode_Data_URL + "/" + user2
    );
    const usersProfileObj = {
      valid: true,
      user1: "",
      user2: "",
    };
    if (!user1Profile.data.username || !user2Profile.data.username) {
      usersProfileObj.valid = false;
      return usersProfileObj;
    }

    usersProfileObj.user1 = user1Profile.data.username;
    usersProfileObj.user2 = user2Profile.data.username;

    return usersProfileObj;
  } catch (e) {
    console.log(" error while fetching user profile ", e);
  }
};
