"use client";
import React, { useState } from "react";

import RatingTable from "./RatingTable";
import { RatingChange } from "@/actions/charts/ratingChange";
import Button from "./Button";
import { tableDataObjType } from "@/types/types";
import MinMaxTable from "./MinMaxTable";
function GetStats() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState<tableDataObjType>();
  const handlerClick = async () => {
    setError(false);
    setData(undefined);
    const alldata = await RatingChange(user1, user2);

    if (alldata.valid) setData(alldata);
    else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="  shadow-lg mx-auto flex flex-col items-center w-[30rem]  p-5 my-7">
        <div className="my-3 flex ">
          <input
            type="text"
            onChange={(e) => setUser1(e.target.value)}
            value={user1}
            placeholder="Ex:babu_323"
            className="  mx-2 w-48 h-10 rounded-md p-3 border-b-2  outline-none focus:border-blue-400"
          />
          <input
            type="text"
            onChange={(e) => setUser2(e.target.value)}
            value={user2}
            placeholder="Ex:shubham_123"
            className=" w-48  h-10 rounded-md p-3  border-b-2 outline-none focus:border-blue-400 "
          />
        </div>
        {error && <div className="my-4 text-red-600">User Not Found</div>}

        <Button
          type="button"
          onClick={handlerClick}
          className=" p-3 bg-blue-400 rounded-lg text-white hover:bg-blue-300  shadow-md"
        >
          Compare
        </Button>
      </div>

      {data && (
        <RatingTable
          valid={data.valid}
          user1={data.user1}
          user2={data.user2}
          commonContests={data.commonContests}
          allRatings={data.allRatings}
        />
      )}

      {data && (
        <MinMaxTable
          user1={data.user1}
          user2={data.user2}
          allRatings={data.allRatings}
        />
      )}
    </div>
  );
}

export default GetStats;
