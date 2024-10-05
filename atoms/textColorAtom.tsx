"use client";

import { atom } from "recoil";

const getDefaultMode = () => {
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("mode") == "dark") return "dark";
  }
  return "light"; // Default to light if window is not defined
};
const textColorAtom = atom({
  key: "mode",
  default: getDefaultMode(),
});

export default textColorAtom;
