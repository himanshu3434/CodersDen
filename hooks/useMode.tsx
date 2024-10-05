"use client";
import textColorAtom from "@/atoms/textColorAtom";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

const useMode = () => {
  const [mode, setMode] = useState("dark");

  const [textColor, setTextColor] = useRecoilState(textColorAtom);

  useEffect(() => {
    const preferedMode = window.localStorage.getItem("mode");

    window.document.documentElement.classList.add(preferedMode ?? mode);
    if (preferedMode) {
      setMode(preferedMode);
      setTextColor(preferedMode === "dark" ? "white" : "black");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mode", mode);
    setTextColor(mode === "dark" ? "white" : "black");
  }, [mode, setTextColor]);

  const toggleMode = () => {
    window.localStorage.setItem("mode", mode === "dark" ? "light" : "dark");

    const currentMode = mode === "dark" ? "light" : "dark";
    setMode(currentMode);
    window.document.documentElement.classList.add(currentMode);
    window.document.documentElement.classList.remove(
      currentMode === "dark" ? "light" : "dark"
    );
    setTextColor(currentMode === "dark" ? "white" : "black");
  };
  // console.log(textColor);
  return { mode, toggleMode };
};

export default useMode;
