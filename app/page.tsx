import { RatingChange } from "@/actions/charts/ratingChange";
import GetStats from "@/components/GetStats";
import { ratingChangeType, tableDataObjType } from "@/types/types";
import { AxiosResponse } from "axios";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <GetStats />
    </div>
  );
}
