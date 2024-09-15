import { RatingChange } from "@/actions/charts/ratingChange";
import GetStats from "@/components/GetStats";
import NavBar from "@/components/NavBar";
import { ratingChangeType, tableDataObjType } from "@/types/types";
import { StyledEngineProvider } from "@mui/material";
import { AxiosResponse } from "axios";
import { useState } from "react";

export default function Home() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="dark:bg-black min-h-screen ">
        <NavBar />
        <div className="max-w-[70vw] mx-auto">
          <GetStats />
        </div>
      </div>
    </StyledEngineProvider>
  );
}
