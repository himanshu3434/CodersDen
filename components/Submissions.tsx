"use client";
import { SubmissionsDetails } from "@/actions/charts/submissionDetails";
import { AllSubmissionDataType } from "@/types/types";
import React, { useEffect, useState } from "react";
import MaxSubmissionTable from "./MaxSubmissionTable";
import StreakSubmissionTable from "./StreakSubmissionTable";
import ChartType1 from "./skeleton/ChartType1";
const union = (arr1: number[], arr2: number[]) => {
  return [...Array.from(new Set([...arr1, ...arr2]))];
};
function Submissions({ user1, user2 }: { user1: string; user2: string }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState<number[]>([2024]);
  const [loading, setLoading] = useState(true);
  const [allSubmissionDetails, setAllSubmissionDetails] =
    useState<AllSubmissionDataType>();
  useEffect(() => {
    const getSubmissions = async () => {
      const allSubmissionDetails = await SubmissionsDetails(user1, user2, year);
      setAllSubmissionDetails(allSubmissionDetails);
      setAvailableYears(
        union(
          allSubmissionDetails.availableYearsUser1,
          allSubmissionDetails.availableYearsUser2
        )
      );
      setLoading(false);
    };

    getSubmissions();
  }, [year]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center  ">
        <div className="flex items-center my-4  w-2/3">
          <hr className="flex-grow border-t-2 dark:border-semiblack  mr-4 border-gray-500 " />
          <span className="text-xl font-semibold dark:text-slate-500 tracking-wider text-blackLighter">
            Submission Stats
          </span>
          <hr className="flex-grow border-t-2 dark:border-semiblack ml-4 border-gray-500" />
        </div>
        {allSubmissionDetails && (
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="dark:bg-semiblack bg-[#262626] py-3 outline-none  rounded-3xl  px-4 text-white "
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
        {loading && (
          <div className="dark:bg-semiblack bg-[#262626] py-3 outline-none  rounded-3xl  px-4 text-white w-[110px] h-[40px] animate-pulse"></div>
        )}
        {allSubmissionDetails && (
          <div className="flex justify-between">
            <div>
              <MaxSubmissionTable
                maxSubmissionDataObj={
                  allSubmissionDetails.maxSubmissionDataObjType
                }
                user1={user1}
                user2={user2}
              />
            </div>

            <div>
              <StreakSubmissionTable
                user1={user1}
                user2={user2}
                allSubmissionDetails={allSubmissionDetails}
              />
            </div>
          </div>
        )}
        {loading && (
          <div className="flex space-x-4">
            {" "}
            <ChartType1 width={400} height={300} />{" "}
            <ChartType1 width={400} height={300} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Submissions;
