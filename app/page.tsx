import { RatingChange } from "@/actions/charts/ratingChange";
import GetStats from "@/components/GetStats";
import NavBar from "@/components/NavBar";
import { ratingChangeType, tableDataObjType } from "@/types/types";
import { AxiosResponse } from "axios";
import { useState } from "react";

export default function Home() {
  return (
    <div className="dark:bg-green-500 h-screen">
      <NavBar />
      <div className="max-w-[70vw] mx-auto">
        <GetStats />
      </div>
    </div>
  );
}
